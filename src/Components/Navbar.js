import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link to='/sign-kit/home' className="navbar-brand mb-0 h1">
                  <div class="logo">
          <a href="#"><span > Sign</span>Speak</a>
        </div>
                </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><a href='/Home/Masthead.js' className="nav-link">Home</a></li>
                        <li className="nav-item"><Link to='/sign-kit/convert' className="nav-link">Translate{'( Text To Sign )'}</Link></li>
                        <li className="nav-item"><Link to='/sign-kit/learn-sign' className="nav-link">Translate</Link></li>
                        <li className="nav-item">
                        <Link to="/chatbot" className="nav-link">Chatbot</Link>
                        </li>
                        {/* <li className="nav-item"><a href='http://127.0.0.1:8000/#' className="nav-link">Contact us</a></li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar