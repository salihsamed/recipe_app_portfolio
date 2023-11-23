import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://recipeapi-x7x0.onrender.com/auth/login",
        { username, password }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-[40%] max-sm:w-[90%] flex flex-col items-center gap-5 border">
      <h1 className="text-2xl font-semibold">LOGIN</h1>
      <form
        className="flex flex-col w-[50%] max-sm:w-full items-center  gap-2"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="Username"
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
          id="Username"
          className="px-1 border rounded-md w-[50%] max-sm:w-[75%]  bg-slate-50 outline-none focus:border-rose-500"
        />
        <label
          htmlFor="Password"
          className="w-[50%] max-sm:w-[75%] text-left font-semibold"
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="Password"
          className="px-1 border rounded-md w-[50%] max-sm:w-[75%] bg-slate-50 outline-none focus:border-rose-500"
        />
        <button
          className="bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded-md text-white w-[25%] my-3 max-sm:w-[50%]"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
