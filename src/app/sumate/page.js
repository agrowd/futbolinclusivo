import Link from "next/link";
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Landmark, 
  HeartHandshake, 
  Briefcase,
  Heart,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "¡Sumate! - Fútbol Inclusivo",
  description: "Descubrí todas las formas de apoyar y participar en la Liga de Fútbol Inclusiva.",
};

const participationOptions = [
  {
    title: "Donaciones Individuales",
    description: "Tu aporte mensual único nos permite sostener los programas deportivos para miles de jóvenes.",
    icon: Heart,
    href: "/sumate/donar",
    color: "var(--color-accent-orange)"
  },
  {
    title: "Voluntariado y Pasantías",
    description: "Sumá tu tiempo, conocimientos y energía a nuestros equipos de trabajo en campo o gestión.",
    icon: Users,
    href: "/sumate/voluntariado",
    color: "var(--color-primary)"
  },
  {
    title: "Alianzas Institucionales",
    description: "Programas de RSE, patrocinios y trabajo conjunto con empresas, fundaciones y gobiernos.",
    icon: HeartHandshake,
    href: "/sumate/alianzas",
    color: "var(--color-accent-blue)"
  }
];

const profiles = [
  { name: "Empresas y Compañías", icon: Briefcase },
  { name: "Fundaciones", icon: Landmark },
  { name: "Gobiernos e Instituciones", icon: Building2 },
  { name: "Jóvenes Líderes", icon: Users },
  { name: "Organizaciones Sociales", icon: HeartHandshake },
  { name: "Universidades", icon: GraduationCap },
];

export default function SumatePage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24" style={{ background: "var(--color-primary-dark)", color: "#fff", padding: "80px 0" }}>
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "24px" }}>
            Se parte del cambio
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90" style={{ fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "800px", margin: "0 auto" }}>
            El movimiento de Fútbol Inclusivo crece gracias al apoyo de personas, organizaciones, empresas e instituciones gubernamentales. Existen múltiples formas de articular y colaborar con nuestra misión.
          </p>
        </div>
      </section>

      {/* Main Options */}
      <section className="section" style={{ padding: "64px 0" }}>
        <div className="container">
          <h2 className="section-title text-center mb-12" style={{ textAlign: "center", marginBottom: "48px" }}>¿Cómo podés colaborar?</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {participationOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "32px",
                  boxShadow: "var(--shadow-md)",
                  borderTop: `4px solid ${option.color}`,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%"
                }}>
                  <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: `${option.color}15`,
                    color: option.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px"
                  }}>
                    <Icon size={32} />
                  </div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--color-primary-dark)" }}>{option.title}</h3>
                  <p style={{ color: "var(--color-text)", lineHeight: 1.6, flexGrow: 1, marginBottom: "24px" }}>
                    {option.description}
                  </p>
                  <Link href={option.href} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: option.color,
                    fontWeight: "bold",
                    textDecoration: "none",
                    padding: "8px 0"
                  }}>
                    Conocer más <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profiles Divider */}
      <section style={{ background: "#f8f9fa", padding: "64px 0", borderTop: "1px solid #eee" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2rem", color: "var(--color-primary-dark)", marginBottom: "16px" }}>Red de Articulación</h2>
            <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto" }}>
              Nuestras alianzas estratégicas involucran a diversos sectores de la sociedad para garantizar un impacto sostenible.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
            {profiles.map((profile, i) => {
              const PIcon = profile.icon;
              return (
                <div key={i} style={{
                  background: "#fff",
                  padding: "16px 24px",
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow: "var(--shadow-sm)",
                  color: "var(--color-primary-dark)",
                  fontWeight: 600,
                  fontSize: "0.95rem"
                }}>
                  <PIcon size={20} style={{ color: "var(--color-primary)" }} />
                  {profile.name}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
