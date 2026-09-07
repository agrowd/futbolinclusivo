import dbConnect from '../src/lib/mongodb.js';
import Infancia from '../src/lib/schemas/InfanciaRegistration.js';

function generateTicketCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INF-${random}`;
}

function generateFamilyGroupId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FAM-${random}`;
}

async function getUniqueTicketCode() {
  let code;
  let exists = true;
  while (exists) {
    code = generateTicketCode();
    const doc = await Infancia.findOne({ ticketCode: code });
    if (!doc) exists = false;
  }
  return code;
}

async function main() {
  await dbConnect();
  console.log('Connected to MongoDB. Starting manual list reconciliation...');

  const now = new Date();

  // 1. UPDATE EXISTING RECORDS TO ATTENDED = TRUE
  const existingUpdates = [
    {
      ticketCode: 'INF-HNHWW',
      label: 'Emily quimey fonzalida bauman (Emily fonsalida)',
      note: 'Acreditado - Confirmado ingreso mediante listado manual en puerta (Tenían QR)'
    },
    {
      ticketCode: 'INF-WWEPK',
      label: 'Luney marilin fonzalida bauman (Cluney/Luney)',
      note: 'Acreditado - Confirmado ingreso mediante listado manual en puerta (Tenían QR)'
    },
    {
      ticketCode: 'INF-869CP',
      label: 'Renata jerez (Renato Gerez)',
      note: 'Verificado ingreso mediante listado manual en puerta (Anotado como Renato Gerez)'
    },
    {
      ticketCode: 'INF-8HQBW',
      label: 'Joscelyn Sarai Boza Pujay (Sarzi bozo)',
      note: 'Verificado ingreso mediante listado manual en puerta (Anotado como Sarzi bozo)'
    },
    {
      ticketCode: 'INF-NXAWZ',
      label: 'Owen Claudio lopez (Owen Lopez)',
      note: 'Verificado ingreso mediante listado manual en puerta (Teléfono en papel 1126113471)'
    },
    {
      ticketCode: 'INF-7GAFQ',
      label: 'Tiara colque',
      note: 'Verificado ingreso mediante listado manual en puerta'
    },
    {
      ticketCode: 'INF-EWMHN',
      label: 'Michael Giménez (Maica Gimenez)',
      note: 'Verificado ingreso mediante listado manual en puerta (Anotado como Maica Gimenez)'
    },
    {
      ticketCode: 'INF-AVD7V',
      label: 'Benjamin Bautista Huertas Campos (Benjamin Huerta)',
      note: 'Verificado ingreso mediante listado manual en puerta (Tenían QR)'
    }
  ];

  console.log('\n--- ACTUALIZANDO ASISTENCIA DE INSCRIPTOS EXISTENTES ---');
  for (const item of existingUpdates) {
    const updated = await Infancia.findOneAndUpdate(
      { ticketCode: item.ticketCode },
      {
        $set: {
          attended: true,
          attendedAt: now,
          notes: item.note
        }
      },
      { returnDocument: 'after' }
    );
    console.log(`✅ [Actualizado] ${item.label}: Ticket ${updated.ticketCode} -> attended: ${updated.attended}`);
  }

  // 2. CREAR CASOS ESPECIALES PARA LOS QUE NO FIGURABAN EN SISTEMA
  console.log('\n--- REGISTRANDO CASOS ESPECIALES (NO ESTABAN PREVIAMENTE) ---');

  const specialCases = [
    {
      name: 'Ramiro Cuñer',
      tutor: 'Adulto Responsable (Cuñer)',
      phone: '1131898430',
      familyGroupId: 'FAM-ESP-CUNER',
      note: 'Caso especial - Listado manual de ingreso en puerta (Sin registro previo en sistema)'
    },
    {
      name: 'Benicio Soñoca',
      tutor: 'Adulto Responsable (Soñoca)',
      phone: '1131898430',
      familyGroupId: 'FAM-ESP-CUNER',
      note: 'Caso especial - Listado manual de ingreso en puerta (Sin registro previo en sistema)'
    },
    {
      name: 'Estefania Mendez',
      tutor: 'Estefania Mendez',
      phone: '1141722042',
      familyGroupId: 'FAM-ESP-MENDEZ',
      note: 'Caso especial - Listado manual de ingreso en puerta (Sin registro previo en sistema)'
    },
    {
      name: 'Nataly Jerez',
      tutor: 'Daniela chavez',
      phone: '1141987242',
      familyGroupId: 'FAM-JTQAFT',
      note: 'Caso especial - Acompañante de Renata Jerez en listado manual en puerta'
    },
    {
      name: 'Naomi Isabel',
      tutor: 'Adulto Responsable (Isabel)',
      phone: '1155884123',
      familyGroupId: 'FAM-ESP-ISABEL',
      note: 'Caso especial - Listado manual de ingreso en puerta (Sin registro previo en sistema)'
    },
    {
      name: 'Alexander Martinez',
      tutor: 'Adulto Responsable (Martinez)',
      phone: '1130151251',
      familyGroupId: 'FAM-ESP-MARTINEZ',
      note: "Caso especial - Listado manual de ingreso en puerta (Sin registro previo / Anotado 'No está')"
    },
    {
      name: 'Sofia Martinez',
      tutor: 'Adulto Responsable (Martinez)',
      phone: '1130151251',
      familyGroupId: 'FAM-ESP-MARTINEZ',
      note: "Caso especial - Listado manual de ingreso en puerta (Sin registro previo / Anotado 'No está')"
    },
    {
      name: 'Bautista Rodriguez',
      tutor: 'Adulto Responsable (Rodriguez)',
      phone: '1151038584',
      familyGroupId: 'FAM-ESP-RODRIGUEZ',
      note: "Caso especial - Listado manual de ingreso en puerta (Sin registro previo / Anotado 'No está')"
    },
    {
      name: 'Brenda Huerta',
      tutor: 'Luisa Campos Paniagua',
      phone: '1168228374',
      familyGroupId: 'FAM-2AVF38',
      note: 'Caso especial - Acompañante de Benjamin en listado manual en puerta (Tenían QR)'
    }
  ];

  for (const sc of specialCases) {
    const existing = await Infancia.findOne({ 
      childName: sc.name, 
      tutorPhone: sc.phone 
    });

    if (existing) {
      console.log(`ℹ️ [Ya existía] ${sc.name} (Ticket ${existing.ticketCode}) -> attended: ${existing.attended}`);
      await Infancia.findByIdAndUpdate(existing._id, {
        $set: { attended: true, attendedAt: now, notes: sc.note }
      });
    } else {
      const ticket = await getUniqueTicketCode();
      const created = await Infancia.create({
        ticketCode: ticket,
        familyGroupId: sc.familyGroupId,
        childName: sc.name,
        tutorName: sc.tutor,
        tutorPhone: sc.phone,
        locality: 'Moreno',
        attended: true,
        attendedAt: now,
        notes: sc.note,
        imageConsent: true,
        status: 'active'
      });
      console.log(`✨ [Caso Especial Creado] ${sc.name} -> Ticket ${ticket}, Tel: ${sc.phone}`);
    }
  }

  const finalTotal = await Infancia.countDocuments({ status: { $ne: 'cancelled' } });
  const finalAttended = await Infancia.countDocuments({ status: { $ne: 'cancelled' }, attended: true });

  console.log(`\n🎉 Conciliación Finalizada con Éxito!`);
  console.log(`Total Inscriptos: ${finalTotal} | Total Acreditados (Ingresaron): ${finalAttended}`);

  process.exit(0);
}

main().catch(err => {
  console.error('Error durante la conciliación:', err);
  process.exit(1);
});
