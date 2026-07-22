import InscriptionForm from "@/components/ui/InscriptionForm";

export const metadata = {
  title: "Inscripción - Fútbol Inclusivo",
  description: "Sumá a tu equipo a la Liga de Fútbol Inclusiva.",
};

export default function InscripcionPage() {
  const heroTitle = "Inscripción a Torneos de Ligas";
  const heroDescription = "Completá el formulario paso a paso para inscribir a tu equipo en la Liga de Fútbol Inclusiva.";
  const formNotice = "";

  return (
    <div className="section" style={{ minHeight: "80vh", padding: "120px 0 60px" }}>
      <InscriptionForm 
        heroTitle={heroTitle}
        heroDescription={heroDescription}
        formNotice={formNotice}
      />
    </div>
  );
}
