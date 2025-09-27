import { useState } from "react";

export const Accordion = ({ faq }) => {
  const { question, answer } = faq;
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      
      {/* Question Button */}
      <h2 id={`accordion-heading-${faq.id}`}>
        <button
          onClick={() => setShow(!show)}
          type="button"
          className="flex items-center justify-between w-full px-5 py-4 sm:py-5 md:py-6 text-left text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          aria-expanded={show}
          aria-controls={`accordion-body-${faq.id}`}
        >
          <span>{question}</span>
          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300 ${show ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>

      {/* Answer Section */}
      <div
        id={`accordion-body-${faq.id}`}
        className={`overflow-hidden transition-all duration-500 ${show ? "max-h-screen" : "max-h-0"}`}
        aria-labelledby={`accordion-heading-${faq.id}`}
      >
        <div className="px-5 py-4 sm:py-5 md:py-6 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};
