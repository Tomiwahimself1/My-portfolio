import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>ℹ️ About Us</h1>
      <p>This is the About Page. Here you’ll learn more about who we are and what we do.</p>
       <p><Link to="/portfolio">Go to Portfolio</Link></p>
       <Link to="/">Back to Home</Link>
    </div>
  );
}

export default About;

