import TorneosClient from "./TorneosClient";

export const metadata = {
  title: "Torneos y Competencias Oficiales | MyGol - Fútbol Inclusivo",
  description: "Consultá fixtures, tablas de posiciones, resultados y estadísticas en vivo de la Liga Inclusiva y la Superliga AFA en MyGol.",
};

export default function TorneosPage() {
  return <TorneosClient />;
}
