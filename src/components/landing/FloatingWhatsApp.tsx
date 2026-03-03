import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/obrigado")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-bounce"
      style={{ animationDuration: "2s", animationIterationCount: "3" }}
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
};

export default FloatingWhatsApp;
