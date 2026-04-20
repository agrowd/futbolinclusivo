import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import InscriptionForm from "@/components/ui/InscriptionForm";

export async function generateMetadata() {
  await dbConnect();
  const pageData = await Page.findOne({ slug: "inscripcion", published: true }).lean();
  return {
    title: pageData?.metadata?.metaTitle || "Inscripción - Fútbol Inclusivo",
    description: pageData?.metadata?.metaDescription || "Sumá a tu equipo a la Liga de Fútbol Inclusiva.",
  };
}

export default async function InscripcionPage() {
  await dbConnect();
  const cmsPage = await Page.findOne({ slug: "inscripcion", published: true }).lean();

  const heroTitle = cmsPage?.data?.hero_title || "Inscripción a Torneos de Ligas";
  const heroDescription = cmsPage?.data?.hero_description || "Completá el formulario paso a paso para inscribir a tu equipo en la Liga de Fútbol Inclusiva.";
  const formNotice = cmsPage?.data?.form_notice || "";

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
