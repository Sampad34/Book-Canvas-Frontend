import { useRef, useState } from "react";
import { UseTitle } from "../hooks/UseTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // make sure path is correct

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
    <main className="max-w-md mx-auto">
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Login
        </p>
      </section>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your email
          </label>
          <input ref={email} type="email" id="email" required placeholder="sampadrb@example.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your password
          </label>
          <input ref={password} type="password" id="password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
        </div>
        <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
};
