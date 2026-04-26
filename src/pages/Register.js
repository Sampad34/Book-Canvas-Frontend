import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import { UseTitle } from "../hooks/UseTitle";

export const Register = () => {
  UseTitle("Register");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    const authDetail = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: password,
    };

    try {
      const data = await register(authDetail);

      if (data?.accessToken) {
        toast.success("Registration successful! Welcome aboard!", {
          position: "bottom-center",
          autoClose: 3000,
        });
        event.target.reset();
        navigate("/products");
      } else {
        toast.error("Registration failed! Please try again.", {
          position: "bottom-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        closeButton: true,
        position: "bottom-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Join the BookVerse community
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                required
                autoComplete="off"
                className="w-full p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="off"
                className="w-full p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                minLength={7}
                placeholder="••••••••"
                className="w-full p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum 7 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full p-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-hourglass-split animate-spin"></i>{" "}
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
