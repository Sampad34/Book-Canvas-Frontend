import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService"; // make sure path is correct
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
        // clear form
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
    <main className="max-w-md mx-auto">
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Register Here
        </p>
      </section>
      <form onSubmit={handleRegister}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your name
          </label>
          <input type="text" id="name" name="name" placeholder="Sampad Roy Barman" required autoComplete="off" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your email
          </label>
          <input type="email" id="email" name="email" placeholder="sampadrb@example.com" required autoComplete="off" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Your password
          </label>
          <input type="password" id="password" name="password" required minLength={7} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" />
        </div>
        <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
};
