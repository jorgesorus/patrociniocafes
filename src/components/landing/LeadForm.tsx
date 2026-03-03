import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formatWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("55") && digits.length >= 12) return digits.slice(0, 13);
  if (digits.length === 11) return `55${digits}`;
  if (digits.length === 10) return `55${digits.slice(0, 2)}9${digits.slice(2)}`;

  return digits;
};

const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const LeadForm = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nome.trim()) errs.nome = "Informe seu nome";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Informe um e-mail válido";
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 11)
      errs.whatsapp = "Informe um WhatsApp válido com DDD";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formatted = formatWhatsApp(whatsapp);

    // Salvar dados do lead no sessionStorage para a página /obrigado
    // Esses dados serão enviados para a CAPI (hasheados no servidor)
    sessionStorage.setItem(
      "lead_data",
      JSON.stringify({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        whatsapp: formatted,
      })
    );

    navigate("/obrigado");
  };

  return (
    <section className="py-16 md:py-24 bg-muted overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">
            Solicite seu Orçamento
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Preencha seus dados e receba o desconto exclusivo pelo WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={100}
              />
              {errors.nome && (
                <p className="text-sm text-destructive">{errors.nome}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="(62) 99870-7805"
                value={whatsapp}
                onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
              />
              {errors.whatsapp && (
                <p className="text-sm text-destructive">{errors.whatsapp}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-semibold"
            >
              <Send className="mr-2 h-5 w-5" />
              Garantir Meu Desconto
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
