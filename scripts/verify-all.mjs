import dbConnect from '../src/lib/mongodb.js';
import Infancia from '../src/lib/schemas/InfanciaRegistration.js';

async function main() {
  await dbConnect();
  const tickets = [
    'INF-HNHWW', 'INF-WWEPK', 'INF-869CP', 'INF-BVFNW', 
    'INF-8HQBW', 'INF-NXAWZ', 'INF-7GAFQ', 'INF-EWMHN', 
    'INF-AVD7V', 'INF-5R7Q3', 'INF-8R7UT', 'INF-ZKYW7', 
    'INF-G3QX8', 'INF-N8G44', 'INF-KG8UM', 'INF-DZQWR', 'INF-36PAM'
  ];
  const results = await Infancia.find({ ticketCode: { $in: tickets } }).lean();
  console.log(`=== VERIFICACIÓN FINAL (${results.length}/${tickets.length} CASOS) ===`);
  results.forEach((r, i) => {
    console.log(`${i+1}. [${r.ticketCode}] ${r.childName} | Tel: ${r.tutorPhone} | Ingreso (attended): ${r.attended} | Notas: ${r.notes}`);
  });
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
