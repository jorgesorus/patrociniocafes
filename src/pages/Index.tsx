import HeroSection from "@/components/landing/HeroSection";
import QualitySection from "@/components/landing/QualitySection";
import LeadForm from "@/components/landing/LeadForm";
import OfferRulesSection from "@/components/landing/OfferRulesSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <QualitySection />
      <LeadForm />
      <OfferRulesSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
