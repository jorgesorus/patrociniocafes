const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h3 className="font-display text-2xl font-bold mb-4">Patrocínio Café</h3>
        <p className="font-body text-sm opacity-80 mb-2">
          CNPJ: 51.205.273/0001-03
        </p>
        <p className="font-body text-sm opacity-80 leading-relaxed">
          AV BANDEIRANTES, QUADRA 125 LOTE 798, 3131 — CEP 74.460-190,
          <br className="hidden sm:block" />
          JD PETROPOLIS, Goiânia — GO
        </p>
        <div className="mt-6 pt-6 border-t border-primary-foreground/20">
          <p className="font-body text-xs opacity-60">
            © {new Date().getFullYear()} Patrocínio Café. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
