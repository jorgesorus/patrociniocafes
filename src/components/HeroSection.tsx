import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo-patrocinio-cafe.png";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-background px-4">
      <div className="container max-w-5xl mx-auto text-center">
        <motion.img
          src={logo}
          alt="Patrocínio Café"
          className="h-28 md:h-36 mx-auto mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          O Seu Café, Com a Sua Marca.
          <br />
          <span className="text-secondary">Qualidade Premium</span> para a Sua Empresa.
        </motion.h1>
        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Torrefação e personalização de cafés (White Label) exclusivos para o mercado B2B.
          Surpreenda seus clientes e parceiros com um café Arábica de excelência, entregue em grãos ou moído.
        </motion.p>
        <motion.button
          onClick={() => navigate("/obrigado")}
          className="bg-secondary text-secondary-foreground font-body font-semibold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Solicitar Orçamento Agora
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
