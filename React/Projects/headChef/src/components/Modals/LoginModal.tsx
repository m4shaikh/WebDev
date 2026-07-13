import { useState } from "react"
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


const LoginModal: React.FC<LoginProps> = ({ setLogin, setShowModal }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const saveAuthData = (data: AuthResponse) => {
    localStorage.setItem(
      "access_token",
      data.access
    );

    localStorage.setItem(
      "refresh_token",
      data.refresh
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setShowModal(false);
  };

  const handleGoogleLogin = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:8000/accounts/google/",
        {
          token: credentialResponse.credential,
        }
      );

      saveAuthData(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  const handleEmailLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/accounts/login/",
        {
          email,
          password,
        }
      );

      saveAuthData(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleEmailLogin()
  }

  return (
    <form onSubmit={handleSubmit} className="font-sour flex flex-col gap-5">

      <div className="flex flex-col">
        <label htmlFor="email" className="pl-2">
          E-mail
        </label>

        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="outline-none bg-secondary-500 p-3 rounded-xl"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="pl-2">
          Password
        </label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="outline-none bg-secondary-500 p-3 rounded-xl"
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </label>

        <button
          type="button"
          className="text-primary-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className="bg-primary-400 rounded-xl py-3 font-semibold cursor-pointer"
      >
        Login
      </button>

      <div
        onClick={() => setLogin(false)}
        className="text-center cursor-pointer hover:underline"
      >
        Don't have an account? Register
      </div>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Login Failed")}
      />

    </form>

  )
}

export default LoginModal