import { useNavigate } from "react-router-dom";
import { TrendingDown, Building2, Scale, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const rules = [
  {
    icon: TrendingDown,
    text: "Descontos progressivos de até 40%.",
    highlight: false,
  },
  {
    icon: Building2,
    text: "Atendimento e faturamento exclusivo para Empresas (B2B).",
    highlight: false,
  },
  {
    icon: Scale,
    text: "Pedido Mínimo de 5kg.",
    highlight: true,
  },
];

const OfferRulesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12">
            Condições da Oferta
          </h2>

          <div className="space-y-6 mb-14">
            {rules.map((rule) => (
              <div
                key={rule.text}
                className={`flex items-center gap-5 p-6 rounded-2xl transition-all ${
                  rule.highlight
                    ? "bg-secondary/20 border border-secondary/40"
                    : "bg-primary-foreground/10 border border-primary-foreground/10"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    rule.highlight
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary-foreground/15"
                  }`}
                >
                  <rule.icon className="h-6 w-6" />
                </div>
                <p
                  className={`text-lg text-left font-medium ${
                    rule.highlight ? "text-secondary" : "text-primary-foreground"
                  }`}
                >
                  {rule.text}
                </p>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/obrigado")}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm sm:text-lg px-8 sm:px-10 py-6 sm:py-7 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Garantir Desconto no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OfferRulesSection;
