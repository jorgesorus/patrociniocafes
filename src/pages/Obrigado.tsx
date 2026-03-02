import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/5562998707805?text=Oi%2C%20gostaria%20de%20um%20or%C3%A7amento";

const Obrigado = () => {
// No Obrigado.tsx, dentro do useEffect, ANTES do redirect:
useEffect(() => {
  // Dispara evento Lead no Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }

  const timer = setTimeout(() => {
    window.location.href = WHATSAPP_URL;
  }, 1000);
  return () => clearTimeout(timer);
}, []);


  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <MessageCircle className="text-primary w-16 h-16 mx-auto mb-6 animate-pulse" />
        <p className="font-display text-xl md:text-2xl text-foreground font-semibold mb-2">
          Redirecionando para o nosso WhatsApp
        </p>
        <p className="font-body text-muted-foreground">
          para iniciarmos o seu orçamento...
        </p>
      </motion.div>
    </main>
  );
};

export default Obrigado;
