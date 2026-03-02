import HeroSection from "@/components/landing/HeroSection";
import QualitySection from "@/components/landing/QualitySection";
import OfferRulesSection from "@/components/landing/OfferRulesSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <QualitySection />
      <OfferRulesSection />
      <Footer />
    </main>
  );
};

export default Index;
