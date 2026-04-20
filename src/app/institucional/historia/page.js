import GenericCmsPage from "@/components/ui/GenericCmsPage";

export const metadata = {
  title: "Nuestra Historia | Fútbol Inclusivo",
  description: "Desde 1998, equiparando oportunidades y construyendo una sociedad más inclusiva.",
};

export default function HistoriaPage() {
  return (
    <GenericCmsPage 
       slug="historia" 
       fallbackTitle="Nuestra Historia" 
       fallbackSubtitle="Más de 25 años de trayectoria transformando realidades a través del deporte."
    />
  );
}
