import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>🏠 Welcome to My Website</h1>
      <p>This is the Home Page. You can learn more about us here:</p>
      <p><Link to="/my-portfolio">Go to My Portfolio</Link></p>
      <p><Link to="/weather">Go to My Weather App</Link></p>
      <p><Link to="/task">Go to Task Management App</Link></p>
      <Link to="/about">Go to About Page</Link>

    </div>
  );
}

export default Home; 