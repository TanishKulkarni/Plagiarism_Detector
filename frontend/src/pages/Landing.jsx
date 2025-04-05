// src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import heroImg from "../assets/hero-graphic.gif"; // You can use a cool Lottie animation or animated SVG

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="navbar">
        <h2 className="logo">Plagiarism Detector</h2>
        <button onClick={() => navigate("/home")} className="nav-btn">
          Go to App
        </button>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>Detect Plagiarism in Seconds</h1>
          <p>
            Upload your documents or paste content to instantly check for
            potential plagiarism. Fast, accurate, and secure.
          </p>
          <button onClick={() => navigate("/home")} className="cta-btn">
            Try It Now
          </button>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Plagiarism detection visual" />
        </div>
      </section>
    </div>
  );
}
