import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PricingSection from "./PricingSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

/* Cette fonction :
Construit la page d’accueil en affichant les sections importées les unes après les autres.
Utilise la classe Tailwind min-h-screen pour que la page occupe au moins toute la hauteur de l’écran.
Applique un fond blanc (bg-white). */