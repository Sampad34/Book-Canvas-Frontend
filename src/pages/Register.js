import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { UseTitle } from "../hooks/UseTitle";

export const Register = () => {
  UseTitle("Register");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    const authDetail = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const data = await register(authDetail);

      if (data.accessToken) {
        toast.success("Registration successful!", {
          position: "bottom-center",
          autoClose: 3000,
        });
        event.target.reset();
        navigate("/products");
      } else {
        toast.error("Registration failed! Try again.", {
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
    <main className="flex justify-center items-center min-h-screen px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 underline underline-offset-4">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Sampad Roy Barman"
              required
              autoComplete="off"
              className="w-full p-3 sm:p-4 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Email Field */}
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
              className="w-full p-3 sm:p-4 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Password Field */}
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
              className="w-full p-3 sm:p-4 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 sm:py-4 text-lg sm:text-xl font-medium text-white rounded-lg shadow-md transition-all duration-300 focus:outline-none ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </section>
    </main>
  );
};
