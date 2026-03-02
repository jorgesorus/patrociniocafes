import { MapPin, Building } from "lucide-react";
import logo from "@/assets/logo-patrocinio.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground/80 border-t border-primary-foreground/10">
      <div className="container py-12">
        <div className="text-center space-y-4">
          <img src={logo} alt="Patrocínio Café" className="w-40 mx-auto brightness-0 invert" />

          <div className="flex items-center justify-center gap-2 text-sm">
            <Building className="h-4 w-4 flex-shrink-0" />
            <span>CNPJ: 51.205.273/0001-03</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm max-w-lg mx-auto">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>
              AV BANDEIRANTES, QUADRA 125 LOTE 798, 3131 — CEP 74.460-190, JD
              PETROPOLIS, Goiânia – GO
            </span>
          </div>

          <p className="text-xs text-primary-foreground/50 pt-4">
            © {new Date().getFullYear()} Patrocínio Café. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
