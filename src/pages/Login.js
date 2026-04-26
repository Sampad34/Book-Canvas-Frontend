import { useRef, useState } from "react";
import { UseTitle } from "../hooks/UseTitle";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export const Login = () => {
  UseTitle("Login");
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);

    const authDetail = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const data = await login(authDetail);

      if (data?.accessToken) {
        toast.success("Welcome back! Login successful.", {
          position: "bottom-center",
          autoClose: 3000,
        });
        navigate("/products");
      } else {
        toast.error("Invalid email or password!", {
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
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                ref={email}
                type="email"
                id="email"
                required
                placeholder="you@example.com"
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
                ref={password}
                type="password"
                id="password"
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
                  <i className="bi bi-hourglass-split animate-spin"></i> Logging
                  in...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
