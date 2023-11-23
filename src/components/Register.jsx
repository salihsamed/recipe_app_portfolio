import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://recipeapi-x7x0.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration completed ! Now login.");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-[40%] max-sm:w-[90%] flex flex-col items-center gap-5 border">
      <h1 className="text-2xl font-semibold">REGISTER</h1>
      <form
        className="flex flex-col w-[50%] max-sm:w-full items-center gap-2"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="loginUsername"
          className="w-[50%] max-sm:w-[75%] text-left font-semibold"
        >
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          id="loginUsername"
          className="px-1 max-sm:w-[75%] border rounded-md w-[50%] bg-slate-50 outline-none focus:border-rose-500"
        />
        <label
          htmlFor="loginPassword"
          className="w-[50%]  max-sm:w-[75%] text-left font-semibold"
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="loginPassword"
          className="px-1 border rounded-md w-[50%] max-sm:w-[75%] bg-slate-50 outline-none focus:border-rose-500"
        />
        <button
          className="bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded-md text-white w-[25%] max-sm:w-[50%] my-3"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
