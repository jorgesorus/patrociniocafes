import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Coffee, Factory, Truck, Wheat } from "lucide-react";
import logo from "@/assets/logo-patrocinio-cafe.png";
import promoImage from "@/assets/promo-kv.jpg";

const highlights = [
  { icon: Coffee, label: "100% Arábica" },
  { icon: Factory, label: "Direto da Fábrica" },
  { icon: Truck, label: "Entrega para Empresas" },
  { icon: Wheat, label: "Grãos ou Moído" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center bg-primary overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={promoImage}
            alt="Promoção Patrocínio Café"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>

        <div className="relative z-10 container max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <motion.img
            src={logo}
            alt="Patrocínio Café"
            className="h-20 md:h-28 mx-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Discount Badge */}
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-secondary bg-primary/80 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center">
              <span className="block text-secondary font-display text-sm md:text-base font-bold">ATÉ</span>
              <span className="block text-secondary font-display text-3xl md:text-4xl font-bold leading-none">40%</span>
              <span className="block text-secondary font-display text-xs md:text-sm font-bold">DE DESCONTO</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Café Premium{" "}
            <span className="text-secondary">Direto da Fábrica</span>
            <br />
            para Sua Empresa
          </motion.h1>

          <motion.p
            className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Compre café 100% Arábica com preços exclusivos de fábrica.
            <br className="hidden sm:block" />
            <strong className="text-secondary">Promoção por tempo limitado</strong> para empresas.
          </motion.p>

          <motion.button
            onClick={() => navigate("/obrigado")}
            className="bg-secondary text-secondary-foreground font-body font-bold text-lg px-10 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Solicitar Orçamento no WhatsApp
          </motion.button>
        </div>
      </section>

      {/* Highlights bar */}
      <section className="bg-muted py-8 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <item.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                <span className="font-body text-sm font-semibold text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="font-display text-lg font-bold mb-2">Patrocínio Café</p>
          <p className="font-body text-xs opacity-70 mb-1">CNPJ: 51.205.273/0001-03</p>
          <p className="font-body text-xs opacity-70">
            AV BANDEIRANTES, QUADRA 125 LOTE 798, 3131 — CEP 74.460-190, JD PETROPOLIS, Goiânia — GO
          </p>
          <div className="mt-4 pt-4 border-t border-primary-foreground/20">
            <p className="font-body text-xs opacity-50">
              © {new Date().getFullYear()} Patrocínio Café. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
