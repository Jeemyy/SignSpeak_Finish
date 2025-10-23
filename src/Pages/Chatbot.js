import React, { useEffect } from "react";
import "./Chatbot.css";

function ChatBot() {
  useEffect(() => {
    // Load marked.js for Markdown rendering
    const markedScript = document.createElement("script");
    markedScript.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    document.body.appendChild(markedScript);

    // Load highlight.js for syntax highlighting
    const highlightScript = document.createElement("script");
    highlightScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    document.body.appendChild(highlightScript);

    // ✅ Load your chatbot logic from public/chatbot.js
    const chatbotScript = document.createElement("script");
    chatbotScript.src = "/chatbot.js"; // served from public/
    chatbotScript.async = true;
    document.body.appendChild(chatbotScript);

    // Cleanup when leaving the page
    return () => {
      document.body.removeChild(markedScript);
      document.body.removeChild(highlightScript);
      document.body.removeChild(chatbotScript);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <h3 className="navbar__logo">
          <span className="logo-signspeak">SignSpeak</span>
        </h3>
        <button className="navbar__button" id="themeToggler">
          <i className="bx bx-sun"></i>
        </button>
      </nav>

      <header className="header">
        <div className="header__title">
          <h1>Hello, There!</h1>
          <h2>How can I help you today?</h2>
        </div>

        <div className="suggests">
          <div className="suggests__item">
            <p className="suggests__item-text">
              Give tips on helping kids finish their homework on time
            </p>
            <div className="suggests__item-icon">
              <i className="bx bx-stopwatch"></i>
            </div>
          </div>

          <div className="suggests__item">
            <p className="suggests__item-text">
              Help me write an out-of-office email
            </p>
            <div className="suggests__item-icon">
              <i className="bx bx-edit-alt"></i>
            </div>
          </div>

          <div className="suggests__item">
            <p className="suggests__item-text">
              Give me phrases to learn a new language
            </p>
            <div className="suggests__item-icon">
              <i className="bx bx-compass"></i>
            </div>
          </div>

          <div className="suggests__item">
            <p className="suggests__item-text">
              Show me how to build something by hand
            </p>
            <div className="suggests__item-icon">
              <i className="bx bx-wrench"></i>
            </div>
          </div>
        </div>
      </header>

      <section className="chats"></section>

      <section className="prompt">
        <form action="#" className="prompt__form" noValidate>
          <div className="prompt__input-wrapper">
            <input
              type="text"
              placeholder="Enter a prompt here"
              className="prompt__form-input"
              required
            />
            <button
              className="prompt__form-button"
              id="sendButton"
              type="button"
            >
              <i className="bx bx-send"></i>
            </button>
            <button
              className="prompt__form-button"
              id="deleteButton"
              type="button"
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        </form>
        <p className="prompt__disclaim">
          Gemini may display inaccurate info, including about people, so
          double-check its responses.
        </p>
      </section>
    </>
  );
}

export default ChatBot;
