import { Accordion } from "./Accordion";

export const Faq = () => {
  const faqs = [
    {
      id: 1,
      question: "Why should I choose BookVerse for learning?",
      answer:
        "BookVerse offers a vast library of curated programming and computer science eBooks. Whether you're a beginner or an expert, our platform provides structured, high-quality content to accelerate your learning journey.",
    },
    {
      id: 2,
      question: "Can I read my eBooks on mobile devices?",
      answer:
        "Absolutely! BookVerse is fully mobile-friendly. Access your purchased eBooks on smartphones and tablets anytime, anywhere, without any restrictions.",
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
        "Yes, BookVerse supports payments from all major international credit and debit cards, PayPal, and other global payment providers for your convenience.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold dark:text-slate-100">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Accordion key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};