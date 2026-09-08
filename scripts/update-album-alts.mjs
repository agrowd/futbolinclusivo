import dbConnect from "../src/lib/mongodb.js";
import Album from "../src/lib/schemas/Album.js";

// Descriptions generators based on album context and photo index
function generatePhotoAlt(album, index, totalPhotos, photo) {
  const isCasla = album.slug.includes("san-lorenzo-de-almagro");
  const isAcevedo = album.slug.includes("sebastianacevedo-ar");
  const isDeporteSocial = album.slug.includes("direccion-de-deporte-social");

  let sede = "";
  let jornada = "";
  let fotografo = album.photographer || "Fútbol Inclusivo Oficial";
  let actionMoment = "";

  if (isCasla) {
    sede = "Sede San Lorenzo de Almagro (CASLA), Ciudad Deportiva (Bajo Flores)";
    jornada = "Fecha 2 de la Superliga Inclusiva en AFA (Sábado 1 de Agosto de 2026)";

    // Progression of match day in CASLA
    const ratio = index / totalPhotos;
    if (index === 0) {
      actionMoment = "Disputa del balón en ofensiva y remate al arco frente a la bandera de Andar FC y SAT";
    } else if (ratio < 0.15) {
      const actions = [
        "Presentación de los planteles y entrada en calor en las canchas de San Lorenzo de Almagro",
        "Disputa de la pelota en el mediocampo entre SAT y los equipos de la liga inclusiva",
        "Jugada ofensiva con pase filtrado entre líneas en campo de CASLA",
        "Intervención defensiva y cobertura de la pelota en el sector lateral",
        "Formación táctica y salida limpia desde el fondo del equipo"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.4) {
      const actions = [
        "Acción de ataque con remate cruzado al arco custodiado por el arquero",
        "Presión alta y recuperación de la posesión del balón en mitad de cancha",
        "Cruce defensivo limpio en el área grande ante la llegada del delantero",
        "Control orientado de balón sobre el césped de la Ciudad Deportiva de San Lorenzo",
        "Pase en profundidad y desmarque de los atacantes en el partido oficial"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.7) {
      const actions = [
        "Disputa aérea de la pelota tras saque de banda cerca del banderín del árbitro",
        "Gran atajada del arquero achicando el ángulo de tiro en jugada mano a mano",
        "Pase colectivo y triangulación ofensiva en el área rival",
        "Jugada de tiro libre con barrera acomodada por el juez de la Superliga",
        "Recuperación del balón y contragolpe coordinado hacia el arco contrario"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.9) {
      const actions = [
        "Festejo de gol con brazos en alto y abrazo fraterno de los compañeros de equipo",
        "Atajada salvadora del guardameta despejando el balón hacia el tiro de esquina",
        "Indicaciones tácticas del cuerpo técnico y entrenadores de Andar FC desde la línea lateral",
        "Aplausos de la hinchada y familias presentes en las gradas de la cancha de CASLA",
        "Celebración de jugada colectiva y choque de manos de los jugadores"
      ];
      actionMoment = actions[index % actions.length];
    } else {
      const actions = [
        "Saludo protocolar de juego limpio entre capitanes y planteles en el Tercer Tiempo",
        "Abrazo fraternal entre jugadores de ambos clubes al término del partido",
        "Foto grupal de la delegación deportiva celebrando el cierre de la jornada en San Lorenzo",
        "Momento de premiación, convivencia e integración comunitaria de los equipos participantes"
      ];
      actionMoment = actions[index % actions.length];
    }
  } else if (isAcevedo) {
    sede = "Predio Lionel Andrés Messi - Sede Oficial AFA (Ezeiza)";
    jornada = "Jornada Oficial de la Superliga Inclusiva en AFA (Sábado 22 de Agosto de 2026)";

    const ratio = index / totalPhotos;
    if (index === 0) {
      actionMoment = "Plantel de Almirante Brown Inclusivo posando con la bandera conmemorativa de la Selección Argentina y AFA Somos Todos También";
    } else if (ratio < 0.15) {
      const actions = [
        "Plantel inclusivo posando en foto institucional con la bandera oficial de la Superliga AFA",
        "Entrada en calor y trabajos precompetitivos de coordinación física en el predio de Ezeiza",
        "Saludo inicial entre capitanes y la terna arbitral en el círculo central de la cancha de AFA",
        "Foto de equipo completa con profesores, directores técnicos y acompañantes",
        "Salida de las delegaciones al campo de juego sintético del Predio Lionel Messi"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.35) {
      const actions = [
        "Avance ofensivo con gambeta y control del balón frente a la marca rival",
        "Pase preciso en el mediocampo distribuyendo el juego hacia las bandas",
        "Cierre defensivo firme y despeje del balón hacia la línea lateral",
        "Duelo individual por la posesión de la pelota en velocidad",
        "Remate potente hacia el arco rival buscando el primer tanto del partido"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.6) {
      const actions = [
        "Atajada destacada del arquero arrojándose al piso para contener el disparo",
        "Disputa de la pelota con juego limpio en la mitad de la cancha de AFA Ezeiza",
        "Saque de esquina ejecutado hacia el corazón del área con presencia de delanteros",
        "Salida rápida de contraataque aprovechando los espacios del rival",
        "Tiro libre directo al arco con barrera defensiva organizada por el arquero"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.85) {
      const actions = [
        "Festejo emotivo del gol con abrazo grupal de todo el plantel en el campo de juego",
        "Gesto de compañerismo ayudando a levantar al jugador rival tras una acción deportiva",
        "Instrucciones tácticas del entrenador de Andar FC en el banco de suplentes",
        "Celebración de una jugada clave con sonrisas y aplausos de la hinchada",
        "Despliegue físico y entrega deportiva en los minutos finales del partido"
      ];
      actionMoment = actions[index % actions.length];
    } else {
      const actions = [
        "Abrazo final de confraternidad en el Tercer Tiempo de la Superliga Inclusiva AFA",
        "Foto grupal de ambos equipos unidos demostrando que el deporte nos une a todos",
        "Festejos con las familias, amigos y simpatizantes en los laterales de la cancha",
        "Entrega de diplomas de participación y medallas conmemorativas en el predio de AFA",
        "Despedida de los planteles tras una inolvidable jornada de inclusión deportiva en Ezeiza"
      ];
      actionMoment = actions[index % actions.length];
    }
  } else if (isDeporteSocial) {
    sede = "Predio Lionel Andrés Messi - Sede Oficial AFA (Ezeiza)";
    jornada = "Jornada Oficial de la Superliga Inclusiva en AFA (Sábado 22 de Agosto de 2026)";

    const ratio = index / totalPhotos;
    if (index === 0) {
      actionMoment = "Delegación deportiva completa posando con la bandera de la Superliga Inclusiva AFA y la Scaloneta";
    } else if (ratio < 0.2) {
      const actions = [
        "Foto grupal del plantel tricolor posando junto al cuerpo técnico y directivos en AFA Ezeiza",
        "Charla técnica de los entrenadores en el césped utilizando pizarra táctica imantada",
        "Reunión de equipo antes del pitazo inicial fijando los acuerdos de convivencia y juego",
        "Entrada en calor con ejercicios con pelota en las canchas del Predio de AFA"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.5) {
      const actions = [
        "Pase en profundidad y avance ofensivo de los mediocampistas hacia el área contraria",
        "Disputa de la pelota con gran compromiso y deportividad en el campo de juego",
        "Acción defensiva de contención y quite limpio de balón en la zona central",
        "Remate al arco buscando abrir el marcador durante el primer tiempo"
      ];
      actionMoment = actions[index % actions.length];
    } else if (ratio < 0.8) {
      const actions = [
        "Atajada del arquero embolsando el balón con seguridad en el suelo",
        "Pase filtrado entre defensores buscando el desborde por la banda derecha",
        "Festejo de gol de los jugadores con aplausos y abrazos de compañerismo",
        "Jugada colectiva de toques rápidos coordinada por el cuerpo técnico de Andar FC"
      ];
      actionMoment = actions[index % actions.length];
    } else {
      const actions = [
        "Intervención de los facilitadores y mediadores en el Tercer Tiempo de reflexión",
        "Saludo afectuoso entre jugadores de ambos clubes al término del encuentro deportivo",
        "Foto de recuerdo de los equipos unidos compartiendo valores de respeto y solidaridad",
        "Cierre de la jornada organizada por la Dirección de Deporte Social en el Predio de AFA Ezeiza"
      ];
      actionMoment = actions[index % actions.length];
    }
  } else {
    sede = "Sede de Fútbol Inclusivo - Andar FC";
    jornada = album.title;
    actionMoment = `Acción de juego y encuentro deportivo en ${album.title}`;
  }

  // Final ALT formulation with ALL key SEO terms
  const alt = `${actionMoment}. Superliga Inclusiva en AFA, ${jornada} en ${sede}. Torneo de Fútbol Inclusivo organizado por Asociación Civil Andar y Andar FC. Fotografía: ${fotografo}. (Foto #${index + 1}).`;

  return alt;
}

async function updateAlbums() {
  await dbConnect();
  console.log("Conectado a MongoDB Atlas. Actualizando ALTs de álbumes e imágenes...");

  const albums = await Album.find({});
  console.log(`Procesando ${albums.length} álbumes...`);

  for (const album of albums) {
    console.log(`\n--- Actualizando: ${album.title} ---`);
    const totalPhotos = album.photos ? album.photos.length : 0;
    console.log(`Total de fotos a procesar: ${totalPhotos}`);

    // Define Cover Image Alt
    let coverAlt = "";
    if (album.slug.includes("san-lorenzo-de-almagro")) {
      coverAlt = `Foto de portada: Acción de juego y remate en la Fecha 2 de la Superliga Inclusiva en AFA, disputada en la Sede San Lorenzo de Almagro (CASLA), Ciudad Deportiva. Torneo de Fútbol Inclusivo organizado por Asociación Civil Andar y Andar FC. Cobertura fotográfica por @karoniniez_ph (Karo Nuñez).`;
    } else if (album.slug.includes("sebastianacevedo-ar")) {
      coverAlt = `Foto de portada: Plantel de Almirante Brown Inclusivo posando con la bandera oficial en la Superliga Inclusiva en AFA, en el Predio Lionel Andrés Messi de Ezeiza. Competencia de Fútbol Inclusivo de Asociación Civil Andar y Andar FC. Fotografía por @sebastianacevedo.ar.`;
    } else if (album.slug.includes("direccion-de-deporte-social")) {
      coverAlt = `Foto de portada: Plantel deportivo posando junto a entrenadores con la bandera de la Superliga Inclusiva en AFA en el Predio Lionel Andrés Messi de Ezeiza. Evento de Fútbol Inclusivo promovido por Asociación Civil Andar y Andar FC. Registro por Dirección de Deporte Social.`;
    } else {
      coverAlt = `Foto de portada oficial del álbum ${album.title} - Fútbol Inclusivo - Asociación Civil Andar y Andar FC.`;
    }

    album.coverImageAlt = coverAlt;

    // Process each photo
    if (album.photos && album.photos.length > 0) {
      album.photos.forEach((photo, idx) => {
        const generatedAlt = generatePhotoAlt(album, idx, totalPhotos, photo);
        photo.alt = generatedAlt;
        photo.caption = generatedAlt; // Also set caption so tooltips and lightboxes display this full context
      });
    }

    album.markModified("photos");
    album.markModified("coverImageAlt");
    await album.save();
    console.log(`✅ Álbum "${album.title}" guardado exitosamente con ${totalPhotos} ALTs generados.`);
  }

  console.log("\n🚀 Todos los álbumes e imágenes han sido actualizados con éxito en MongoDB Atlas.");
  process.exit(0);
}

updateAlbums().catch((err) => {
  console.error("Error al actualizar los álbumes:", err);
  process.exit(1);
});
