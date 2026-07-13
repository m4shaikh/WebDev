import { useState } from "react"
import type { LoginProps } from "./LoginModal"
import axios from "axios";
import type { AuthResponse } from './LoginModal'
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const RegisterModal: React.FC<LoginProps> = ({ setLogin, setShowModal }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const handleRegister = async () => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:8000/accounts/signup/",
        {
          email,
          name,
          password,
        }
      );

      saveAuthData(response.data);

    } catch (error) {
      console.error(error);
    }
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    await handleRegister();
  };

  return (
    <form onSubmit={handleSubmit} className="font-sour flex flex-col gap-4">

      <div className="flex flex-col">
        <label>Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none bg-secondary-500 p-3 rounded-xl"
          placeholder="Enter your name"
        />
      </div>



      <div className="flex flex-col">
        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none bg-secondary-500 p-3 rounded-xl"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col">
        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none bg-secondary-500 p-3 rounded-xl"
          placeholder="Create password"
        />
      </div>

      <label className="flex gap-2 items-center text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(true)}
        />
        I agree to the Terms & Conditions
      </label>

      <button
        type="submit"
        className="bg-primary-400 rounded-xl py-3 font-semibold cursor-pointer"
      >
        Register
      </button>

      <div
        onClick={() => setLogin(true)}
        className="text-center cursor-pointer hover:underline"
      >
        Already have an account? Login
      </div>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Login Failed")}
      />
    </form>
  )
}

export default RegisterModal