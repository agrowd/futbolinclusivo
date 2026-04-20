import GenericCmsPage from "@/components/ui/GenericCmsPage";

export const metadata = {
  title: "Sobre Nosotros - Fútbol Inclusivo",
  description: "Conocé la historia y el equipo detrás de la Liga de Fútbol Inclusiva.",
};

export default function NosotrosPage() {
  return (
    <GenericCmsPage 
       slug="nosotros" 
       fallbackTitle="Sobre Nosotros" 
       fallbackSubtitle="Más de 25 años construyendo inclusión a través del fútbol."
    />
  );
}
