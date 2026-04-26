import React from "react";
import { Link } from "react-router-dom";
import study from "../../../assets/images/study.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 md:py-20 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left mt-8 lg:mt-0 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Unlock Your
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Coding Potential
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
            Dive into a vast library of computer science and programming ebooks.
            Learn, code, and stay ahead with the latest resources at your
            fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-xl text-lg px-8 py-4 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse eBooks <i className="bi bi-arrow-right"></i>
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold rounded-xl text-lg px-8 py-4 transition-all duration-300"
            >
              Get Started <i className="bi bi-person-plus"></i>
            </Link>
          </div>
        </div>

        {/* Visual Section */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <img
              src={study}
              alt="Laptop Hero"
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
