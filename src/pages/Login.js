import { useRef, useState } from "react";
import { UseTitle } from "../hooks/UseTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

      if (data.accessToken) {
        toast.success("Login successful!", {
          position: "bottom-center",
          autoClose: 3000,
        });
        navigate("/products");
      } else {
        toast.error("Invalid credentials!", {
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
    <main className="flex justify-center items-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6 underline underline-offset-4">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Email
            </label>
            <input
              ref={email}
              type="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full p-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full p-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-medium text-white rounded-lg shadow-md transition-all duration-300 focus:outline-none ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
};
