import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5562998707805?text=Oi%2C%20gostaria%20de%20um%20or%C3%A7amento";

const Obrigado = () => {
  useEffect(() => {
    // Meta Pixel - Lead Event
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: 'WhatsApp Desconto',
        content_category: 'B2B Coffee',
      });
    }

    const timer = setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 animate-pulse-soft">
          <MessageCircle className="h-10 w-10 text-primary" />
        </div>
        <p className="text-xl md:text-2xl font-heading font-semibold text-foreground max-w-md">
          Redirecionando para o nosso WhatsApp para liberar o seu desconto...
        </p>
        <div className="flex justify-center gap-1.5 pt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Obrigado;
