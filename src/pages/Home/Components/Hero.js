import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-gray-50 dark:bg-gray-900 dark:text-slate-100">
      
      {/* Text Section */}
      <div className="flex-1 text-center lg:text-left mt-8 lg:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Unlock Your Coding Potential
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
          Dive into a vast library of computer science and programming ebooks. 
          Learn, code, and stay ahead with the latest resources at your fingertips.
        </p>
        <Link
          to="/products"
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Browse eBooks
        </Link>
      </div>

      {/* Visual Section */}
      <div className="flex-1 flex justify-center lg:justify-end">
        <img
          src="https://source.unsplash.com/random/?programming,code,technology&1"
          alt="Hero illustration"
          className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};
