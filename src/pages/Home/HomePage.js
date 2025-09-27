import { UseTitle } from "../../hooks/UseTitle";
import { Hero } from "./Components/Hero";
import { FeatureProducts } from "./Components/FeatureProducts";
import { Testimonials } from "./Components/Testimonials";
import { Faq } from "./Components/Faq";

export const HomePage = () => {
  UseTitle("Get access to Computer Science Ebooks");
  return (
    <main>
      <div>
        <Hero />
        <FeatureProducts />
        <Testimonials />
        <Faq />
      </div>
    </main>
  );
};
