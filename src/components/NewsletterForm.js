'use client';

export default function NewsletterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Newsletter subscription:', email);
    // Aquí puedes agregar la lógica para suscribir al newsletter
    alert('¡Gracias por suscribirte a nuestro newsletter!');
    e.target.reset();
  };

  return (
    <div style={{ 
      background: "linear-gradient(135deg, rgba(230,126,34,0.1) 0%, rgba(230,126,34,0.05) 100%)",
      padding: "60px 40px", 
      borderRadius: "30px", 
      border: "1px solid rgba(230,126,34,0.2)",
      textAlign: "center"
    }}>
      <div style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "rgba(230,126,34,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 30px"
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", marginBottom: "20px" }}>
        ¿Querés estar siempre actualizado?
      </h2>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
        Suscribite a nuestro newsletter y recibí todas las novedades del fútbol inclusivo directamente en tu correo.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <input
          type="email"
          name="email"
          placeholder="Tu correo electrónico"
          required
          style={{
            padding: "16px 24px",
            borderRadius: "12px",
            border: "2px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "1rem",
            minWidth: "300px"
          }}
        />
        <button type="submit" style={{
          padding: "16px 32px",
          borderRadius: "12px",
          background: "#E67E22",
          color: "#fff",
          fontWeight: 800,
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.3s"
        }}>
          Suscribirse
        </button>
      </form>
    </div>
  );
}
