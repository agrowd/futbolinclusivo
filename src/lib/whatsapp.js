/**
 * Formats a raw telephone string into an international WhatsApp-compatible number format (549XXXXXXXXXX)
 */
export function formatWhatsAppPhone(phone) {
  if (!phone) return "";
  let cleaned = phone.replace(/\D/g, ""); // Remove non-digit characters
  if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
  if (cleaned.startsWith("15")) cleaned = "11" + cleaned.substring(2);
  if (!cleaned.startsWith("54")) {
    cleaned = "549" + cleaned;
  } else if (cleaned.startsWith("54") && !cleaned.startsWith("549")) {
    cleaned = "549" + cleaned.substring(2);
  }
  return cleaned;
}

/**
 * Builds a clean, friendly WhatsApp message template for sharing QR tickets with parents
 */
export function buildWhatsAppMessage({
  tutorName,
  ticketCode,
  childName,
  ticketsCount = 1,
  tickets = [],
  siteUrl = "https://futbolinclusivo.org.ar",
}) {
  const name = tutorName ? tutorName.trim() : "Familia";
  
  let passesListText = "";
  if (tickets && tickets.length > 0) {
    passesListText = tickets
      .map((t, i) => `   *#${i + 1}* — *${t.childName}* (Código: *${t.ticketCode}*)`)
      .join("\n");
  } else if (ticketCode) {
    passesListText = `   • *${childName || "Participante"}* (Código: *${ticketCode}*)`;
  }

  return `¡Hola ${name}! 👋

Te escribimos de *Fútbol Inclusivo - Asociación Civil Andar* ⚽❤️

Te confirmamos la inscripción para el *Día de las Infancias* 🎉

🎟️ *PASES DE INGRESO (${ticketsCount} ${ticketsCount === 1 ? "inscripto" : "inscriptos"}):*
${passesListText}

📌 *RECOMENDACIONES PARA EL INGRESO:*
1️⃣ Mostrá este mensaje o la pantalla de tu celular con los códigos de pase en la mesa de entrada.
2️⃣ El equipo de acreditaciones escaneará el pase para tu ingreso directo.
3️⃣ ¡Vengan listos para disfrutar de los inflables, torneo, actividades recreativas y sorpresas! 🎈🥳

📍 *Lugar:* Complejo Deportivo Fútbol por la Inclusión (Moreno)
🌐 *Más información y consulta de pases:* ${siteUrl}/dia-de-las-infancias

¡Los esperamos con mucha alegría! 🙌😊`;
}

/**
 * Generates a direct WhatsApp web/app link with pre-populated message
 */
export function getWhatsAppLink(phone, messageParams) {
  const cleanPhone = formatWhatsAppPhone(phone);
  const text = encodeURIComponent(buildWhatsAppMessage(messageParams));
  return cleanPhone ? `https://wa.me/${cleanPhone}?text=${text}` : `https://wa.me/?text=${text}`;
}
