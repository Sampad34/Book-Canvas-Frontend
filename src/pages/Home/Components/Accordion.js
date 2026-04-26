import { useState } from "react";

export const Accordion = ({ faq }) => {
  const { question, answer } = faq;
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Question Button */}
      <button
        onClick={() => setShow(!show)}
        className="flex items-center justify-between w-full px-6 py-4 text-left text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        aria-expanded={show}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${show ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Answer Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ${show ? "max-h-48" : "max-h-0"}`}
      >
        <div className="px-6 py-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50">
          <p className="text-sm sm:text-base leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};
