import { Coffee, Award, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Coffee,
    title: "Café Padrão 14 Acima",
    description: "Grãos selecionados com classificação superior, garantindo sabor e aroma excepcionais.",
    color: "text-primary",
  },
  {
    icon: Award,
    title: "100% Arábica & Bebida Dura",
    description: "Café de alta qualidade com corpo e sabor intenso, ideal para paladares exigentes.",
    color: "text-secondary",
  },
  {
    icon: ShieldCheck,
    title: "Laudo de Pureza Garantido",
    description: "Transparência total com certificação de pureza em cada lote entregue.",
    color: "text-primary",
  },
  {
    icon: Truck,
    title: "Em Grãos ou Moído (Sua Escolha)",
    description: "Flexibilidade na entrega para atender às necessidades da sua operação.",
    color: "text-secondary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-primary text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Nossos Diferenciais
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Cada xícara carrega o compromisso com a excelência da região do Cerrado Mineiro.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card rounded-xl p-8 text-center shadow-sm border border-border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <feature.icon className={`${feature.color} w-10 h-10 mx-auto mb-5`} strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
