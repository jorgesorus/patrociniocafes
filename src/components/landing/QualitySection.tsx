import { Coffee, Award, ShieldCheck, Package } from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "Café Padrão 14 Acima",
    description: "Grãos selecionados com rigoroso controle de qualidade.",
  },
  {
    icon: Award,
    title: "100% Arábica & Bebida Dura",
    description: "Sabor encorpado e aroma inconfundível em cada xícara.",
  },
  {
    icon: ShieldCheck,
    title: "Laudo de Pureza Garantido",
    description: "Transparência total com certificação de pureza.",
  },
  {
    icon: Package,
    title: "Em Grãos ou Moído",
    description: "Escolha o formato ideal para o seu negócio.",
  },
];

const QualitySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Qualidade que Sua Empresa <span className="text-secondary">Merece</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Café premium com rastreabilidade completa, da fazenda à sua xícara.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg hover:border-secondary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-secondary/15 group-hover:text-secondary transition-colors duration-300">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
