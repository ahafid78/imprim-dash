import React, { useRef } from "react";
import { login } from "../services/auth.service";

export default function HomePage() {
  const email = useRef();
  const password = useRef();
  const handleLogin = () => {
    console.log(email);
    login({ email: email.current, passwords: password.current });
  };
  return (
    <div
      className="container-fluid w-screen h-screen bg-blue-950
    flex justify-center items-center
    "
    >
      <div className="form-wrapper w-1/3 bg-white border border-gray-300 p-8">
        <h1 className="text-gray-800 text-xl font-bold">
          Login to your account
        </h1>
        <div className="form-group mt-3">
          <input
            type="email"
            placeholder="enter your email"
            className="p-3 w-full border border-gray-300 border-r-sm"
            ref={email}
            onChange={(e) => (email.current = e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="password"
            placeholder="enter your password"
            className="p-3 w-full border border-gray-300 border-r-sm"
            ref={password}
            onChange={(e) => (password.current = e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <button
            onClick={handleLogin}
            className="btn py-3 w-full bg-blue-500 text-white font-bold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
