import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Masthead.css";
import appImage from './img/upscalemedia-transformed.png';
import Convert from "../../Pages/Convert";
import LearnSign from "../../Pages/LearnSign";


function Masthead() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  // ✅ Load Spline script once (for web component support)
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.9.66/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <div className="masthead-wrapper">
      <div className="masthead-container">
        <header className="head" id="head">
          <div className="logo">
            <Link to="#">
              <span>Sign</span>Speak
            </Link>
          </div>

          <nav className="nav1">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
              <i className="bx bx-menu"></i>
            </label>
            <ul className="links">
              <li>
                <Link to="/" id="a1">
                  Home
                </Link>
              </li>
              <li>
                <a href="#sec2" id="a2">
                  Services
                </a>
              </li>
              <li>
                <Link to="/translate" id="a5">
                  Translate
                </Link>
              </li>
              <li>
                <Link to="/chatbot" id="a3">
                  Chatbot
                </Link>
              </li>
              <li>
                <a href="#contact" id="a4">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="list">
            <Link to="/HTML/signIn.html">
              <button className="sign" id="signin">
                Sign In
              </button>
            </Link>
            <Link to="/HTML/signup.html">
              <button className="sign" id="signup">
                Sign Up
              </button>
            </Link>
          </div>
        </header>

        {/* Section 1 */}
        <section className="sec1">
          <div className="text">
            <span className="blur"></span>
            <span className="blur"></span>

            <div className="body-title">
              <span className="hi">Hi, There</span>
              <br />
              This application aims
              <br />
              to enhance communication
              <br />
              between normal people and special needs
              <br />
              <span id="d">(Deaf and Mute)</span>
            </div>

            <div className="assist">
              If you need help using the app, talk to the chatbot.
            </div>

            <div className="image">
              <img src={appImage} alt="App illustration" />
            </div>

            <div className="button">
              <a href="#">
                <button>Get Started</button>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2 - Services */}
        <section className="sec2" id="sec2">
          <div className="container">
            <h1>Services</h1>
            <div className="all-card">
              {/* Card 1 */}
              <div className="card">
                <div className="icon">
                  <i className="fa-solid fa-globe"></i>
                </div>
                <h3>
                  Translate <br />
                  <span>
                    Text <i className="fa-solid fa-arrow-right"></i> Sign
                  </span>
                </h3>
                <div className="new-card">
                  <i className="fa-solid fa-circle-dot"></i>
                  Convert audio speech to sign language using a 3D model.
                </div>
                <Link to="/translate">
                  <button>Check</button>
                </Link>
              </div>

              {/* Card 2 */}
              <div className="card">
                <div className="icon">
                  <i className="fa-solid fa-hands-asl-interpreting"></i>
                </div>
                <h3>
                  Translate <br />
                  <span>
                    Sign <i className="fa-solid fa-arrow-right"></i> Text
                  </span>
                </h3>
                <div className="new-card">
                  <i className="fa-solid fa-circle-dot"></i>
                  Analyze hand signals and convert them into text or audio.
                </div>
                <Link to="/sign-to-text">
                  <button>Check</button>
                </Link>
              </div>

              {/* Card 3 */}
              <div className="card">
                <div className="icon">
                  <i className="fa-brands fa-slack"></i>
                </div>
                <h3>ChatBot</h3>
                <div className="new-card">
                  <i className="fa-solid fa-circle-dot"></i>
                  An integrated chatbot to assist users with sign language.
                </div>
                <Link to="/chatbot">
                  <button>Check</button>
                </Link>
              </div>

              {/* Card 4 */}
              <div className="card">
                <div className="icon">
                  <i className="fa-solid fa-language"></i>
                </div>
                <h3>
                  Sign Language <br /> Dictionary
                </h3>
                <div className="new-card">
                  <i className="fa-solid fa-circle-dot"></i>
                  Access a library of translated signs to learn effectively.
                </div>
                <Link to="/dictionary">
                  <button>Check</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 - 3D Model */}
        <section className="sec3">
          {/* <img
            className="image-gradient"
            src="/img/gradient.png"
            alt="gradient background"
          /> */}
          <div className="layer-blur"></div>
          <main>
            <div className="content">
              <div className="tag-box">
                <div className="tag">Translate &wedbar;</div>
              </div>
              <h1>
                We are <br /> here to help you
              </h1>
              <p className="description">
                Being different isn't a weakness — it's a strength that helps us
                see life from a more beautiful perspective.
              </p>
              <div className="buttons">
              <Link to="/sign-kit/convert" className="btn-get-started">
                <span>
                  <i className="fa-solid fa-globe"></i> Text{" "}
                  <i className="fa-solid fa-arrow-right"></i> Sign
                </span>
              </Link>
                <a href="#" className="btn-sign-main">
                  <span>
                    <i className="fa-solid fa-language"></i> Sign{" "}
                    <i className="fa-solid fa-arrow-right"></i> Text
                  </span>
                </a>
              </div>
            </div>
          </main>
          {/* <spline-viewer
            class="robot-3d-1"
            url="https://prod.spline.design/fXa0FXm76Z3Zl-vd/scene.splinecode"
          ></spline-viewer> */}
        </section>

        {/* Section 4 */}
        <section className="sec4">
          <div className="layer-blur"></div>
          <main>
            <div className="content">
              <div className="tag-box">
                <div className="tag">Dictionary &Wfr;</div>
              </div>
              <h1>Different, not less</h1>
              <p className="description">
                Being different isn't a weakness — it's a strength that helps us
                see life from a more beautiful perspective.
              </p>
              <div className="buttons">
                <Link to="/sign-kit/learn-sign" className="btn-sign-main">
                  <span>
                      <i className="fa-solid fa-hexagon-nodes"></i> Start learning
                  </span>
              </Link>

              </div>
            </div>
          </main>
          {/* <spline-viewer
            class="robot-3d-2"
            url="https://prod.spline.design/C-t82yr86uqOqiVC/scene.splinecode"
          ></spline-viewer> */}
        </section>

        {/* Section 5 - Contact */}
        <section className="sec5" id="contact">
          <h1>
            Contact <span>Us</span>
          </h1>
          <div className="contact">
            <div className="social">
              <div className="address">
                <div id="i">
                  <a
                    href="https://goo.gl/maps/fayoum"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid fa-location-dot"></i>
                  </a>
                </div>
                <div className="info">
                  <h3>Address</h3>
                  <p>Egypt, Fayoum</p>
                </div>
              </div>

              <div className="mail">
                <div id="i">
                  <a href="mailto:signspeak@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
                <div className="info">
                  <h3>E-mail</h3>
                  <p>signspeak@gmail.com</p>
                </div>
              </div>

              <div className="whats">
                <div id="i">
                  <a
                    href="tel:+201062166414"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
                <div className="info">
                  <h3>Whatsapp</h3>
                  <p>
                    <span>+20</span>1062166414
                  </p>
                </div>
              </div>
            </div>

            <div className="msg">
              <form onSubmit={handleSubmit}>
                <h2>Message</h2>
                <div className="input-box">
                  <input type="text" name="username" required />
                  <span>Username</span>
                  <input type="email" name="email" required />
                  <span>E-mail</span>
                  <textarea name="message" required></textarea>
                  <span>Your Message...</span>
                  <input type="submit" value="Send" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Masthead;
