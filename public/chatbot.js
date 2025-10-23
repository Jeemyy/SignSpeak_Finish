// public/chatbot.js
(function () {
  /* ---- Utility: wait for condition (poll) ---- */
  function waitFor(conditionFn, timeout = 5000, interval = 50) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
      (function check() {
        try {
          if (conditionFn()) return resolve(true);
        } catch (e) { /* ignore */ }
        if (Date.now() - start >= timeout) return reject(new Error("waitFor timeout"));
        setTimeout(check, interval);
      })();
    });
  }

  /* ---- Main initializer ---- */
  function initChatbot() {
    // Query DOM elements (inside DOMContentLoaded)
    const messageForm = document.querySelector(".prompt__form");
    const chatHistoryContainer = document.querySelector(".chats");
    const suggestionItems = document.querySelectorAll(".suggests__item");
    const themeToggleButton = document.getElementById("themeToggler");
    const clearChatButton = document.getElementById("deleteButton");

    // Basic guards
    if (!messageForm) {
      console.warn("Chatbot: .prompt__form not found in DOM. Chat UI might not be rendered.");
      return;
    }
    if (!chatHistoryContainer) {
      console.warn("Chatbot: .chats container not found in DOM.");
      return;
    }

    // State variables
    let currentUserMessage = null;
    let isGeneratingResponse = false;

    const GOOGLE_API_KEY = "AIzaSyAHd_z6qPvkguiaeHIz0N2eKUduFf0MxvY";
    const API_REQUEST_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;

    /* ---- Helper functions ---- */
    const createChatMessageElement = (htmlContent, ...cssClasses) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", ...cssClasses);
      messageElement.innerHTML = htmlContent;
      return messageElement;
    };

    // We will expose this globally because your markup calls it inline
    window.copyMessageToClipboard = (copyButton) => {
      try {
        const messageContent = copyButton.parentElement.querySelector(".message__text").innerText;
        navigator.clipboard.writeText(messageContent);
        copyButton.innerHTML = `<i class='bx bx-check'></i>`; // Confirmation icon
        setTimeout(() => (copyButton.innerHTML = `<i class='bx bx-copy-alt'></i>`), 1000);
      } catch (err) {
        console.error("copyMessageToClipboard:", err);
      }
    };

    const addCopyButtonToCodeBlocks = () => {
      // If hljs hasn't run yet, still safe
      const codeBlocks = document.querySelectorAll("pre");
      codeBlocks.forEach((block) => {
        const codeElement = block.querySelector("code");
        if (!codeElement) return;
        // avoid adding duplicate controls
        if (block.querySelector(".code__copy-btn")) return;

        const language =
          [...codeElement.classList].find((cls) => cls.startsWith("language-"))?.replace("language-", "") ||
          "Text";

        const languageLabel = document.createElement("div");
        languageLabel.innerText = language.charAt(0).toUpperCase() + language.slice(1);
        languageLabel.classList.add("code__language-label");
        block.appendChild(languageLabel);

        const copyButton = document.createElement("button");
        copyButton.innerHTML = `<i class='bx bx-copy'></i>`;
        copyButton.classList.add("code__copy-btn");
        block.appendChild(copyButton);

        copyButton.addEventListener("click", () => {
          navigator.clipboard
            .writeText(codeElement.innerText)
            .then(() => {
              copyButton.innerHTML = `<i class='bx bx-check'></i>`;
              setTimeout(() => (copyButton.innerHTML = `<i class='bx bx-copy'></i>`), 2000);
            })
            .catch((err) => {
              console.error("Copy failed:", err);
              alert("Unable to copy text!");
            });
        });
      });
    };

    const showTypingEffect = (rawText, htmlText, messageElement, incomingMessageElement, skipEffect = false) => {
      const copyIconElement = incomingMessageElement.querySelector(".message__icon");
      if (copyIconElement) copyIconElement.classList.add("hide");

      if (skipEffect) {
        messageElement.innerHTML = htmlText;
        try { window.hljs?.highlightAll(); } catch (e) { /* ignore */ }
        addCopyButtonToCodeBlocks();
        if (copyIconElement) copyIconElement.classList.remove("hide");
        isGeneratingResponse = false;
        return;
      }

      const wordsArray = (rawText || "").split(" ");
      let wordIndex = 0;

      const typingInterval = setInterval(() => {
        messageElement.innerText += (wordIndex === 0 ? "" : " ") + (wordsArray[wordIndex] || "");
        wordIndex++;
        if (wordIndex >= wordsArray.length) {
          clearInterval(typingInterval);
          isGeneratingResponse = false;
          messageElement.innerHTML = htmlText;
          try { window.hljs?.highlightAll(); } catch (e) { /* ignore */ }
          addCopyButtonToCodeBlocks();
          if (copyIconElement) copyIconElement.classList.remove("hide");
        }
      }, 35);
    };

    const requestApiResponse = async (incomingMessageElement) => {
      const messageTextElement = incomingMessageElement.querySelector(".message__text");
      try {
        const resp = await fetch(API_REQUEST_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: currentUserMessage }] }],
          }),
        });

        const responseData = await resp.json();
        if (!resp.ok) throw new Error(responseData.error?.message || "API error");

        const responseText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const parsedApiResponse = window.marked ? window.marked.parse(responseText) : responseText;
        showTypingEffect(responseText, parsedApiResponse, messageTextElement, incomingMessageElement);

        // save conversation
        const savedConversations = JSON.parse(localStorage.getItem("saved-api-chats") || "[]");
        savedConversations.push({ userMessage: currentUserMessage, apiResponse: responseData });
        localStorage.setItem("saved-api-chats", JSON.stringify(savedConversations));
      } catch (err) {
        isGeneratingResponse = false;
        if (messageTextElement) {
          messageTextElement.innerText = err.message || "Request failed";
          messageTextElement.closest(".message")?.classList.add("message--error");
        }
      } finally {
        incomingMessageElement.classList.remove("message--loading");
      }
    };

    const displayLoadingAnimation = () => {
      const loadingHtml = `
        <div class="message__content">
            <img class="message__avatar" src="assets/gemini.svg" alt="Gemini avatar">
            <p class="message__text"></p>
            <div class="message__loading-indicator">
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
                <div class="message__loading-bar"></div>
            </div>
        </div>
        <span class="message__icon hide"><i class='bx bx-copy-alt'></i></span>
      `;
      const loadingMessageElement = createChatMessageElement(loadingHtml, "message--incoming", "message--loading");
      chatHistoryContainer.appendChild(loadingMessageElement);
      requestApiResponse(loadingMessageElement);
    };

    const handleOutgoingMessage = () => {
      const inputEl = messageForm.querySelector(".prompt__form-input");
      currentUserMessage = (inputEl && inputEl.value.trim()) || currentUserMessage;
      if (!currentUserMessage || isGeneratingResponse) return;

      isGeneratingResponse = true;

      const outgoingMessageHtml = `
        <div class="message__content">
            <img class="message__avatar" src="assets/profile.png" alt="User avatar">
            <p class="message__text"></p>
        </div>
      `;
      const outgoingMessageElement = createChatMessageElement(outgoingMessageHtml, "message--outgoing");
      outgoingMessageElement.querySelector(".message__text").innerText = currentUserMessage;
      chatHistoryContainer.appendChild(outgoingMessageElement);

      if (messageForm) messageForm.reset();
      document.body.classList.add("hide-header");
      setTimeout(displayLoadingAnimation, 500);
    };

    const loadSavedChatHistory = () => {
      const savedConversations = JSON.parse(localStorage.getItem("saved-api-chats") || "[]");
      const isLightTheme = localStorage.getItem("themeColor") === "light_mode";
      document.body.classList.toggle("light_mode", isLightTheme);
      if (themeToggleButton) {
        themeToggleButton.innerHTML = isLightTheme ? '<i class="bx bx-moon"></i>' : '<i class="bx bx-sun"></i>';
      }

      chatHistoryContainer.innerHTML = "";

      savedConversations.forEach((conversation) => {
        const userMessageHtml = `
          <div class="message__content">
              <img class="message__avatar" src="assets/profile.png" alt="User avatar">
             <p class="message__text">${conversation.userMessage}</p>
          </div>
        `;
        const outgoingMessageElement = createChatMessageElement(userMessageHtml, "message--outgoing");
        chatHistoryContainer.appendChild(outgoingMessageElement);

        const responseText = conversation.apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const parsedApiResponse = window.marked ? window.marked.parse(responseText) : responseText;
        const responseHtml = `
          <div class="message__content">
              <img class="message__avatar" src="assets/gemini.svg" alt="Gemini avatar">
              <p class="message__text"></p>
              <div class="message__loading-indicator hide">
                  <div class="message__loading-bar"></div>
                  <div class="message__loading-bar"></div>
                  <div class="message__loading-bar"></div>
              </div>
          </div>
          <span class="message__icon hide"><i class='bx bx-copy-alt'></i></span>
        `;
        const incomingMessageElement = createChatMessageElement(responseHtml, "message--incoming");
        chatHistoryContainer.appendChild(incomingMessageElement);
        const messageTextElement = incomingMessageElement.querySelector(".message__text");
        showTypingEffect(responseText, parsedApiResponse, messageTextElement, incomingMessageElement, true);
      });

      document.body.classList.toggle("hide-header", savedConversations.length > 0);
    };

    /* ---- Attach event listeners (safely) ---- */
    // send button
    const sendBtn = document.getElementById("sendButton");
    if (sendBtn) sendBtn.addEventListener("click", handleOutgoingMessage);

    // delete / clear button
    if (clearChatButton) {
      clearChatButton.addEventListener('click', () => {
        // eslint-disable-next-line no-alert
        if (window.confirm("Are you sure you want to delete all chat history?")) {
          localStorage.removeItem("saved-api-chats");
          loadSavedChatHistory();
          currentUserMessage = null;
          isGeneratingResponse = false;
        }
      });
    }

    // suggestions
    if (suggestionItems && suggestionItems.length) {
      suggestionItems.forEach((suggestion) => {
        suggestion.addEventListener("click", () => {
          currentUserMessage = suggestion.querySelector(".suggests__item-text")?.innerText || "";
          handleOutgoingMessage();
        });
      });
    }

    // form submit (prevent default)
    if (messageForm) {
      messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleOutgoingMessage();
      });
    }

    // theme toggle
    if (themeToggleButton) {
      themeToggleButton.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light_mode");
        localStorage.setItem("themeColor", isLight ? "light_mode" : "dark_mode");
        const newIconClass = isLight ? "bx bx-moon" : "bx bx-sun";
        const iconEl = themeToggleButton.querySelector("i");
        if (iconEl) iconEl.className = newIconClass;
      });
    }

    // initial load
    loadSavedChatHistory();
  } // initChatbot

  /* ---- Wait for DOM and optional libs, then initialize ---- */
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // wait up to 3s for marked and highlight.js if they exist on the page
      await waitFor(() => window.marked && window.hljs, 3000).catch(() => {
        console.warn("marked or hljs did not load in time — continuing without them.");
      });
    } catch (e) {
      /* ignore */
    }
    // run initializer
    initChatbot();
  });
})();
