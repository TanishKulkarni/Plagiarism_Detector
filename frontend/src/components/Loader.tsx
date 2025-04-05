import React from 'React'
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p>Processing... Please wait</p>
    </div>
  );
};

export default Loader;
