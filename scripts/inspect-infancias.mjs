import dbConnect from '../src/lib/mongodb.js';
import Infancia from '../src/lib/schemas/InfanciaRegistration.js';
import fs from 'fs';

async function main() {
  await dbConnect();
  const all = await Infancia.find({}).lean();
  console.log(`Loaded ${all.length} registrations.`);

  // Write all to a local JSON so we can easily search
  fs.writeFileSync('scripts/all_infancias.json', JSON.stringify(all, null, 2));
  console.log('Saved to scripts/all_infancias.json');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
