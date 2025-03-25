import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface FormData {
  email: string;
  password: string;
}

interface GoogleDecodedToken {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (for email/password login)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/email-login", formData);

      // Extract token from response
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem("authToken", token);
      console.log("Stored tokenemail:", token);

      // Set token in API headers for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setMessage(response.data.message || "Login successful");
      setError("");

      // Redirect to dashboard
      navigate("/dashboard", { state: { email: formData.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      setMessage("");
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      // Decode the JWT token from Google
      const token = credentialResponse.credential;
      if (!token) {
        throw new Error("Google credential is missing");
      }
      const decoded = jwtDecode<GoogleDecodedToken>(token);

      console.log("Decoded Google Credential:", decoded);

      // Send decoded data to your backend
      const loginResponse = await api.post("/google-login", {
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        photo: decoded.picture,
      });

      // Extract token from response
      const { token: authToken } = loginResponse.data;

      // Store token in localStorage
      localStorage.setItem("authToken", authToken);
      console.log("Stored token:", authToken);

      // Set token in API headers for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      setMessage(loginResponse.data.message || "Google login successful");
      setError("");

      // Redirect to dashboard
      navigate("/dashboard", { state: { email: decoded.email } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Google login failed");
      setMessage("");
    }
  };

  // Handle Google Login Error
  const handleGoogleError = () => {
    console.log("Google Login Failed");
    setError("Google login failed. Please try again.");
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 text-center">
        Welcome Back!
      </h1>

      {message && <div className="text-green-600 mb-4">{message}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl grid grid-cols-1 gap-6 w-full max-w-md"
      >
        <div>
          <label className="block text-lg font-medium text-gray-800">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-800">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
        <div className="text-center">
          <Link to="/forgetpass" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;