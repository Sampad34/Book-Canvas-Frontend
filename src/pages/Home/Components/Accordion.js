import { useState } from "react";

export const Accordion = ({ faq }) => {
  const { question, answer } = faq;
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <h2 id="accordion-heading" className="">
        <button
          onClick={() => setShow(!show)}
          type="button"
          className="flex items-center justify-between w-full p-5 text-left text-lg font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          aria-expanded={show}
          aria-controls="accordion-body"
        >
          <span>{question}</span>
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${show ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      {show && (
        <div
          id="accordion-body"
          className="p-5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 transition"
          aria-labelledby="accordion-heading"
        >
          <p className="text-base leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};
