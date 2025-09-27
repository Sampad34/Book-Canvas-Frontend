import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-12 dark:text-slate-100 bg-gray-50 dark:bg-gray-900">
      
      {/* Text Section */}
      <div className="flex-1 text-center lg:text-left mt-8 lg:mt-0">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Unlock Your Coding Potential
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-700 dark:text-gray-300">
          Dive into a vast library of computer science and programming ebooks. 
          Learn, code, and stay ahead with the latest resources at your fingertips.
        </p>
        <Link
          to="/products"
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 transition-all duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Browse eBooks
        </Link>
      </div>

      {/* Visual Section */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <img
          src="https://images.unsplash.com/photo-1581091870622-3a94d3f7c0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
          alt="Hero illustration"
          className="w-full max-w-lg rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};
