import { Resend } from "resend";
import QRCode from "qrcode";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "Fútbol Inclusivo <onboarding@resend.dev>";

const resend = resendApiKey && resendApiKey !== "re_xxxxxxxxxxxxx" 
  ? new Resend(resendApiKey) 
  : null;

/**
 * Sends a confirmation email to the parent/tutor containing their QR passes and tickets
 * 
 * @param {Object} params
 * @param {string} params.tutorEmail - Recipient email
 * @param {string} params.tutorName - Adult/tutor name
 * @param {string} params.tutorPhone - Contact phone
 * @param {string} params.locality - Locality/neighborhood
 * @param {string} params.familyGroupId - Shared family ID
 * @param {Array} params.tickets - Array of ticket objects [{ ticketCode, childName, childDni, childAge, medicalNotes, qrDataUrl }]
 */
export async function sendInfanciasEmail({
  tutorEmail,
  tutorName,
  tutorPhone,
  locality,
  familyGroupId,
  tickets = [],
}) {
  if (!tutorEmail || !tutorEmail.includes("@")) {
    console.warn("[EMAIL] No valid recipient email provided:", tutorEmail);
    return { success: false, reason: "no_valid_email" };
  }

  if (!tickets || tickets.length === 0) {
    console.warn("[EMAIL] No tickets provided for email");
    return { success: false, reason: "no_tickets" };
  }

  try {
    // Generate inline QR images for email attachments
    const attachments = [];
    const ticketsWithCid = await Promise.all(
      tickets.map(async (t, index) => {
        const cid = `qr-${t.ticketCode}-${index}`;
        
        let base64Image = t.qrDataUrl;
        if (!base64Image) {
          const qrPayload = JSON.stringify({
            code: t.ticketCode,
            id: t.id || t._id,
            name: t.childName,
          });
          base64Image = await QRCode.toDataURL(qrPayload, {
            errorCorrectionLevel: "M",
            margin: 2,
            width: 320,
            color: { dark: "#000B1A", light: "#FFFFFF" },
          });
        }

        // Convert base64 data URL to Buffer for Resend attachment
        const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        attachments.push({
          filename: `Pase-QR-${t.ticketCode}.png`,
          content: buffer,
          cid: cid,
        });

        return {
          ...t,
          cid: cid,
        };
      })
    );

    const displayName = tutorName || "Familia";
    const ticketsCount = tickets.length;
    const subject = `🎟️ Tus Pases con QR para el Día de las Infancias - Fútbol Inclusivo (${ticketsCount} ${ticketsCount === 1 ? "Inscripto" : "Inscriptos"})`;

    // Render HTML Email Template
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tus Pases - Día de las Infancias</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000B1A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #FFFFFF;">
  
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000B1A; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <!-- Main Card Container -->
        <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #00132B; border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #36b37e, #2980B9, #E67E22);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 35px 30px 25px 30px; text-align: center; background-color: rgba(255,255,255,0.02);">
              <span style="background-color: rgba(54,179,126,0.2); color: #36b37e; padding: 6px 16px; border-radius: 50px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
                ¡INSCRIPCIÓN CONFIRMADA!
              </span>
              <h1 style="margin: 18px 0 6px 0; font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; color: #FFFFFF;">
                Día de las Infancias
              </h1>
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.6);">
                Asociación Civil Andar • Complejo Deportivo Fútbol por la Inclusión
              </p>
            </td>
          </tr>

          <!-- Greeting & Details -->
          <tr>
            <td style="padding: 25px 30px; border-top: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #FFFFFF;">
                Hola ${displayName},
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.8);">
                ¡Ya están listos los pases de tu familia! A continuación te adjuntamos los pases individuales con sus códigos QR de acceso. Presentalos desde tu celular en la mesa de entrada el día del evento.
              </p>

              <!-- Family Info Box -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 15px;">
                <tr>
                  <td style="font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.8;">
                    👨‍👩‍👧 <strong>Tutor Responsable:</strong> ${displayName}<br>
                    📞 <strong>Teléfono de Contacto:</strong> ${tutorPhone || "—"}<br>
                    📍 <strong>Localidad:</strong> ${locality || "Moreno"}<br>
                    🏷️ <strong>Grupo Familiar:</strong> <span style="font-family: monospace; color: #36b37e; font-weight: bold;">${familyGroupId || "FAM-ACCESO"}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Individual Tickets & QRs Section -->
          <tr>
            <td style="padding: 10px 30px 25px 30px;">
              <h2 style="margin: 0 0 20px 0; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: #36b37e; text-align: center;">
                🎟️ Pases y Códigos de Ingreso (${ticketsCount})
              </h2>

              ${ticketsWithCid.map((t, i) => `
                <div style="background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 20px; margin-bottom: 20px; text-align: center;">
                  
                  <!-- QR Image -->
                  <div style="background-color: #FFFFFF; border-radius: 16px; padding: 12px; display: inline-block; margin-bottom: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                    <img src="cid:${t.cid}" alt="QR Ticket ${t.ticketCode}" width="200" height="200" style="display: block; width: 200px; height: 200px; border: 0;" />
                  </div>

                  <!-- Ticket Code -->
                  <div style="font-family: monospace; font-size: 22px; font-weight: 900; color: #36b37e; letter-spacing: 2px; margin-bottom: 4px;">
                    ${t.ticketCode}
                  </div>

                  <!-- Child Name -->
                  <div style="font-size: 18px; font-weight: 800; color: #FFFFFF; margin-bottom: 10px;">
                    ${t.childName}
                  </div>

                  <!-- Details -->
                  <div style="font-size: 12px; color: rgba(255,255,255,0.7); line-height: 1.6;">
                    ${t.childDni ? `<strong>DNI:</strong> ${t.childDni} &nbsp;•&nbsp; ` : ""}
                    ${t.childAge ? `<strong>Edad:</strong> ${t.childAge} años` : ""}
                    ${t.medicalNotes ? `<br><span style="color: #ff7675;">⚠️ <strong>Atención médica:</strong> ${t.medicalNotes}</span>` : ""}
                  </div>

                </div>
              `).join("")}

            </td>
          </tr>

          <!-- Event Day Instructions -->
          <tr>
            <td style="padding: 25px 30px; background-color: rgba(41,128,185,0.15); border-top: 1px solid rgba(255,255,255,0.1);">
              <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #2980B9;">
                📌 ¿Qué tenés que hacer el día del evento?
              </h3>
              <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: rgba(255,255,255,0.9); line-height: 1.8;">
                <li><strong>Guardá este correo:</strong> Podés mostrar este mail directamente desde tu celular.</li>
                <li><strong>En la puerta de entrada:</strong> Mostrás la pantalla con el código QR de cada uno de tus niños/as.</li>
                <li><strong>El personal lo escaneará:</strong> Y podés ingresar a disfrutar del torneo, inflables, actividades recreativas y sorpresas.</li>
              </ol>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 30px; text-align: center; background-color: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); font-size: 12px; color: rgba(255,255,255,0.4);">
              <p style="margin: 0 0 8px 0; font-weight: 700; color: rgba(255,255,255,0.7);">
                Asociación Civil Andar • Fútbol Inclusivo
              </p>
              <p style="margin: 0; line-height: 1.5;">
                Moreno, Buenos Aires, Argentina.<br>
                Este correo fue enviado automáticamente por la inscripción al Día de las Infancias.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `;

    if (resend) {
      console.log(`[EMAIL] Enviando correo con ${tickets.length} pases QR a ${tutorEmail} vía Resend...`);
      const response = await resend.emails.send({
        from: resendFromEmail,
        to: [tutorEmail],
        subject: subject,
        html: htmlContent,
        attachments: attachments,
      });

      console.log("[EMAIL] Resend response:", response);
      return { success: true, resendId: response.id || response.data?.id };
    } else {
      console.log(`[EMAIL] (SIMULACIÓN - Sin RESEND_API_KEY) Email listo para ${tutorEmail} con ${tickets.length} pases QR.`);
      return { success: true, simulated: true };
    }
  } catch (err) {
    console.error("[EMAIL] Error al enviar email con Resend:", err);
    return { success: false, error: err.message };
  }
}
