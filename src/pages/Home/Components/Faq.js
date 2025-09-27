import { Accordion } from "./Accordion";

export const Faq = () => {
  const faqs = [
    {
      id: 1,
      question: "Why should I choose CodeBook for learning?",
      answer:
        "CodeBook offers a vast library of curated programming and computer science eBooks. Whether you're a beginner or an expert, our platform provides structured, high-quality content to accelerate your learning journey.",
    },
    {
      id: 2,
      question: "Can I read my eBooks on mobile devices?",
      answer:
        "Absolutely! CodeBook is fully mobile-friendly. Access your purchased eBooks on smartphones and tablets anytime, anywhere, without any restrictions.",
    },
    {
      id: 3,
      question: "What is your refund policy?",
      answer:
        "We offer a 14-day refund policy on all purchases. If you're not satisfied with your eBook, contact our support team within 14 days of purchase for a full refund.",
    },
    {
      id: 4,
      question: "Do you support international payments?",
      answer:
        "Yes, CodeBook supports payments from all major international credit and debit cards, PayPal, and other global payment providers for your convenience.",
    },
  ];

  return (
    <section className="my-12 sm:my-16 px-4 sm:px-6 md:px-8 lg:px-16 py-8 border rounded-xl shadow-md dark:border-slate-700 dark:bg-gray-800 transition-all">
      
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold dark:text-slate-100 mb-6 underline underline-offset-8">
        Frequently Asked Questions
      </h1>

      {/* Accordion Container */}
      <div className="space-y-4 md:space-y-6">
        {faqs.map((faq) => (
          <Accordion key={faq.id} faq={faq} />
        ))}
      </div>
    </section>
  );
};
