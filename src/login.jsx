// src/Login.js
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (error) {
      alert("Login failed. Trying signup...");
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        onLogin();
      } catch (signupError) {
        alert("Signup failed: " + signupError.message);
      }
    }
  };

  return (
    <div className="login">
      <h2>Login or Sign Up</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Continue</button>
    </div>
  );
}

export default Login;