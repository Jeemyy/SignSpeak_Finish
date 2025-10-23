import './App.css'
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Convert from './Pages/Convert';
import Home from './Pages/Home';
import LearnSign from './Pages/LearnSign';
import Video from './Pages/Video';
import Navbar from './Components/Navbar';
import CreateVideo from './Pages/CreateVideo';
import Footer from './Components/Footer';
import Videos from './Pages/Videos';
import Feedback from './Pages/Feedback';
import Chatbot from './Pages/Chatbot';

function App() {
  return(
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path='/sign-kit/convert' element={<Convert />} />
          <Route exact path='/sign-kit/learn-sign' element={<LearnSign />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route exact path='*' element={<Home/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;