import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Como Funciona
        </motion.h2>
        <motion.div
          className="bg-muted rounded-2xl p-8 md:p-12 border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="font-body text-lg text-foreground mb-4 font-medium">
            Atendimento Exclusivo para Empresas (B2B).
          </p>
          <p className="font-body text-muted-foreground mb-4 leading-relaxed">
            Pedido Mínimo de{" "}
            <span className="text-secondary font-bold text-lg">5kg</span>{" "}
            para garantir frescor e qualidade em cada entrega.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            O rótulo é totalmente personalizado com a marca da sua empresa.
            Você recebe um café premium com a sua identidade visual — pronto para encantar seus clientes.
          </p>
          <motion.button
            onClick={() => navigate("/obrigado")}
            className="bg-secondary text-secondary-foreground font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Orçamento Agora
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
