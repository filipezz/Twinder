import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <h1>Twinder</h1>

      <a href="http://localhost:3333/auth/twitter/">
        <button>Login com Twitter</button>
      </a>
    </div>
  );
}

export default Login;
