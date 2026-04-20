import { MapPin } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import CourtReservationSystem from "@/components/ui/CourtReservationSystem";

const COURTS = [
  { id: "cancha-1", name: "Cancha 1 — Pasto sintético", capacity: "Fútbol 7" },
  { id: "cancha-2", name: "Cancha 2 — Pasto natural", capacity: "Fútbol 11" },
  { id: "cancha-3", name: "Cancha 3 — Multiuso", capacity: "Fútbol 5 / Multideporte" },
];

export async function generateMetadata() {
  await dbConnect();
  const pageData = await Page.findOne({ slug: "canchas", published: true }).lean();
  return {
    title: pageData?.metadata?.metaTitle || "Alquiler de Canchas - Fútbol Inclusivo",
    description: pageData?.metadata?.metaDescription || "Reservá tu cancha con disponibilidad en tiempo real.",
  };
}

export default async function CanchasPage() {
  await dbConnect();
  const cmsPage = await Page.findOne({ slug: "canchas", published: true }).lean();

  const heroTitle = cmsPage?.data?.hero_title || "Alquiler de Canchas";
  const heroSubtitle = cmsPage?.data?.hero_subtitle || "Reservá tu cancha con disponibilidad en tiempo real. Este servicio es abierto a todas las personas.";

  return (
    <div className="section" style={{ minHeight: "80vh", padding: "120px 0 60px" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="hero-badge" style={{ justifyContent: "center", margin: "0 auto 16px" }}>
            <MapPin size={16} aria-hidden="true" />
            Complejo "Fútbol por la Inclusión"
          </div>
          <h1 className="section-title" style={{ textAlign: "center" }}>
            {heroTitle}
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: "600px" }}>
            {heroSubtitle}
          </p>
        </div>

        {/* Client Component for Reservation Logic */}
        <CourtReservationSystem courts={COURTS} />
      </div>
    </div>
  );
}
