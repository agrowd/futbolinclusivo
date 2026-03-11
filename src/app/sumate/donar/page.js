import { Heart, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Donar - Fútbol Inclusivo",
  description: "Sumá tu aporte para sostener los programas deportivos y sociales de la Liga de Fútbol Inclusiva.",
};

export default function DonarPage() {
  return (
    <div className="page-container">
      <section style={{ background: "var(--color-accent-orange)", color: "#fff", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.2)", padding: "8px 16px", borderRadius: "100px", marginBottom: "16px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px" }}>
            SUMATE
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "24px" }}>Aportes Individuales</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto" }}>
            Tu donación mensual nos permite becar a más jugadores físicos, entregar materiales deportivos y sostener la estructura de las Ligas en todo el país.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "80px 0", background: "#f8f9fa" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          
          <div style={{ background: "#fff", padding: "48px", borderRadius: "16px", boxShadow: "var(--shadow-lg)", border: "1px solid #eee" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Heart size={48} style={{ color: "var(--color-accent-orange)", margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: "2rem", color: "var(--color-primary-dark)" }}>Elegí el monto de tu aporte</h2>
              <p style={{ color: "#666" }}>Podes modificar o cancelar tu suscripción en cualquier momento.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
              <button className="btn btn-outline" style={{ fontSize: "1.2rem", padding: "16px" }}>$5.000</button>
              <button className="btn btn-primary" style={{ fontSize: "1.2rem", padding: "16px", background: "var(--color-accent-orange)", borderColor: "var(--color-accent-orange)" }}>$10.000</button>
              <button className="btn btn-outline" style={{ fontSize: "1.2rem", padding: "16px" }}>$20.000</button>
            </div>
            
            <div style={{ marginBottom: "32px" }}>
              <label className="form-label">Otro monto ($)</label>
              <input type="number" className="form-input" placeholder="Ej: 15000" />
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: "100%", display: "flex", justifyContent: "center", gap: "12px", background: "var(--color-primary-dark)", border: "none" }}>
              <CreditCard size={24} /> Continuar al Pago Seguro
            </button>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "24px", color: "#888", fontSize: "0.9rem" }}>
              <ShieldCheck size={16} /> Transacción 100% segura mediante MercadoPago
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
