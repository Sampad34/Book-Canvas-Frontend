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
    <section className="my-20 px-6 md:px-12">
      <h1 className="text-3xl sm:text-4xl text-center font-semibold dark:text-slate-100 mb-10 underline underline-offset-8">
        What Our Students Say
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, index) => (
          <figure
            key={index}
            className="flex flex-col justify-between items-center p-6 bg-white rounded-xl border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 text-center transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <blockquote className="mb-6 text-gray-600 dark:text-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t.title}
              </h3>
              <p className="text-sm font-light">{t.text}</p>
            </blockquote>

            <figcaption className="flex flex-col items-center space-y-2">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={t.image}
                alt={t.name}
              />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
