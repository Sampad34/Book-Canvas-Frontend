import React from "react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Alice Johnson",
      role: "Software Engineer at TechCorp",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      title: "Boosted my coding skills",
      text: "CodeBook has an amazing library of resources! It helped me level up my programming skills in no time.",
    },
    {
      name: "Mark Thompson",
      role: "Frontend Developer at Webify",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      title: "Highly recommended!",
      text: "The curated ebooks and tutorials saved me countless hours. The platform is intuitive and easy to use.",
    },
    {
      name: "Sophia Lee",
      role: "Data Scientist at DataWorks",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      title: "Invaluable resource",
      text: "I love the quality and diversity of the content. CodeBook has become my go-to library for tech books.",
    },
    {
      name: "James Miller",
      role: "CTO at InnovateX",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      title: "A game changer",
      text: "From beginners to experts, CodeBook provides valuable ebooks that make learning programming efficient and fun.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold dark:text-slate-100">
            What <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Students Say</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Join thousands of happy learners</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-yellow-400 text-sm"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                  src={t.image}
                  alt={t.name}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};