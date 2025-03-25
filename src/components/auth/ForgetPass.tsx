import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/axiosInstance";

interface FormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

function ForgetPass() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate that newPassword and confirmPassword match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      setMessage("");
      setLoading(false);
      return;
    }

    // Prepare data to send to backend
    const { email, newPassword } = formData;

    try {
      // Send request to backend forgotPassword endpoint
      const response = await api.post("/forgot-password", {
        email,
        newPassword,
      });

      setMessage(response.data.message || "Password reset successfully");
      setError("");
      setLoading(false);

      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Optional: Delay to show success message before redirecting
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to reset password. Please try again."
      );
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 text-center">
        Reset Your Password
      </h1>
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
            New Password:
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-800">
            Confirm New Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </button>
        {message && <div className="text-green-600 mt-4">{message}</div>}
        {error && <div className="text-red-600 mt-4">{error}</div>}
        <div className="text-center mt-4">
          <span className="text-gray-600">Remembered your password? </span>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgetPass;