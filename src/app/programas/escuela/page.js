import GenericCmsPage from "@/components/ui/GenericCmsPage";

export const metadata = {
  title: "Escuela de Valores - EFI | Fútbol Inclusivo",
  description: "Formación integral para niños y jóvenes. Metodología: Acuerdos, Partidos y Reflexión.",
};

export default function EscuelaPage() {
  return (
    <GenericCmsPage 
       slug="escuela" 
       fallbackTitle="Escuela de Fútbol Inclusivo" 
       fallbackSubtitle="Un modelo de aprendizaje basado en la convivencia y el fútbol inclusivo."
    />
  );
}
