import dbConnect from "../src/lib/mongodb.js";
import Album from "../src/lib/schemas/Album.js";

async function run() {
  await dbConnect();
  console.log("Conectado a MongoDB Atlas.");

  await Album.updateOne(
    { slug: "superliga-inclusiva-en-afa-sabado-2208-sebastianacevedo-ar" },
    { $set: { photographer: "@sebastianacevedo.ar" } }
  );

  await Album.updateOne(
    { slug: "superliga-inclusiva-en-afa-sabado-0108-san-lorenzo-de-almagro-karoniniez-ph" },
    { $set: { photographer: "@karoniniez_ph" } }
  );

  await Album.updateOne(
    { slug: "superliga-inclusiva-en-afa-sabado-2208-direccion-de-deporte-social" },
    { $set: { photographer: "Dirección de Deporte Social" } }
  );

  const all = await Album.find({}).select("title photographer slug").lean();
  console.log("Álbumes actualizados en DB con fotógrafo:", JSON.stringify(all, null, 2));
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
