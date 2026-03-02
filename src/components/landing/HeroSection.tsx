import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCoffee from "@/assets/hero-coffee.jpg";
import logo from "@/assets/logo-patrocinio.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroCoffee}
          alt="Grãos de café premium arábica"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
        <div className="flex flex-col items-center text-center max-w-2xl lg:max-w-3xl mx-auto gap-6 sm:gap-8">
          <img
            src={logo}
            alt="Patrocínio Café"
            className="w-44 sm:w-56 md:w-64 lg:w-72 brightness-0 invert drop-shadow-xl"
          />

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground leading-tight">
            Reduza os Custos da Sua Empresa: Café Premium Direto da Fábrica com até 40% de Desconto.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 max-w-lg mx-auto leading-relaxed">
            Oferta exclusiva para empresas (CNPJ). Garanta um café de alta
            qualidade para o seu negócio, direto da nossa torrefação para você,
            sem intermediários.
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/obrigado")}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm sm:text-base md:text-lg px-6 sm:px-10 py-5 sm:py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <MessageCircle className="mr-2 h-5 w-5 flex-shrink-0" />
            Garantir Desconto no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
