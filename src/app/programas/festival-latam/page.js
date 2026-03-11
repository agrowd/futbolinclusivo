import { Map, Trophy, Network, MessageSquare, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Festival Latinoamericano de Fútbol 3",
  description: "Encuentro internacional de organizaciones promovido por la Asociación Civil Andar.",
};

const orgLatam = [
  { country: "Brasil", orgs: [{ n: "Fundação Eprocad", p: "Promueve la formación integral de niños y adolescentes después de la escuela.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/02-logo-eprocad.jpg" }, { n: "A Instituto Fazer Acontecer", p: "Mediante actividades educativas orientadas al deporte ayudan a familias jóvenes.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/03-logo-fazer-acontecer.jpg" }, { n: "Instituto Formação", p: "Compromiso con el desarrollo sostenible de las regiones maranhenses.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/04-logo-formacao.jpg" }] },
  { country: "Chile", orgs: [{ n: "Fundacion Educere", p: "Proporciona programas educativos y liderazgo juvenil en Santiago.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/05-logo-educere.jpg" }, { n: "Futbol Más", p: "Objetivo de promover la resiliencia y la felicidad en niñas, niños y adolescentes.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/06-logo-futbol-mas.jpg" }] },
  { country: "Colombia", orgs: [{ n: "Fundación Tiempo De Juego", p: "Habilidades para la vida a través de actividades deportivas, culturales.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/07-logo-tiempo-de-juego.jpg" }, { n: "Futbol Con Corazón", p: "Busca reducir situaciones riesgosas promoviendo respeto y solidaridad.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/08-logo-futbol-con-corazon.jpg" }] },
  { country: "Cuba", orgs: [{ n: "Camaquito", p: "Organización suiza que apoya a los niños y adolescentes cubanos.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/09-logo-camaquito.jpg" }] },
  { country: "Costa Rica / El Salvador", orgs: [{ n: "Organización Juvenil Recrearte", p: "Promueve el desarrollo físico, motriz y emocional de niños.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/10-logo-recrearte.jpg" }, { n: "Seprojoven", p: "Promueve activamente procesos participativos en el desarrollo personal.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/11-logo-sepro-joven.jpg" }] },
  { country: "Ecuador", orgs: [{ n: "FUDELA", p: "A GANAR ofrece capacitación integral y desarrollo de habilidades.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/12-logo-fudela.jpg" }] },
  { country: "Perú", orgs: [{ n: "Asociación Civil Los Pioneros", p: "Promueve cambios positivos en Callao usando el fútbol desde 1978.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/13-logo-los-pioneros.jpg" }, { n: "Asociación Civil Wara", p: "Fortalece capacidades que contribuye a la construcción de una sociedad justa.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/14-logo-wara.jpg" }, { n: "CEDEC", p: "Implementa programas educativos y de desarrollo humano integral.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/15-logo-cedec-peru.jpg" }] },
  { country: "Uruguay", orgs: [{ n: "Gurises Unidos", p: "Protege y promueve los derechos de los niños desfavorecidos.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/16-logo-gurises-unidos.jpg" }] },
];

export default function FestivalLatam() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <Flame className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Festival Latinoamericano de Fútbol 3</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
               Empoderamiento juvenil, igualdad de género e inclusión social en la región.
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <FadeIn>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4">
                   Resumen del Festival
                </h2>
                <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                    <p>Del 2 al 6 de noviembre más de 140 jóvenes participaron del Festival Latinoamericano de Fútbol 3, evento impulsado por la Asociación Civil Andar y streetfootballworld, que tuvo como ejes de desarrollo el empoderamiento juvenil, igualdad de género e inclusión social, tres focos temáticos directamente relacionados con los objetivos de fútbol para el desarrollo en la región. Este evento internacional reunió a 16 organizaciones de 10 países de Latinoamérica que llegaron a Buenos Aires para demostrar el poder del fútbol como herramienta de transformación social!</p>
                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
             <div className="space-y-6 pt-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-blue pl-4 flex items-center gap-2">
                   <MessageSquare className="w-8 h-8 text-accent-blue" aria-hidden="true" />
                   Foro Juvenil
                </h2>
                <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                    <p>El Salón Auditorio del Hotel Sheraton Buenos Aires albergó el Foro Juvenil del Festival Latinoamericano de Fútbol 3. Jóvenes líderes de las diferentes organizaciones participantes pudieron compartir sus experiencias personales y como el futbol les permitió vencer situaciones de vulnerabilidad y como apoyo el crecimiento personal de cada uno.</p>
                    <p>Situaciones de violencia de género, discriminación por discapacidad, marginación y falta de oportunidades, son algunas de las situaciones en las cuales se han encontrado estos jóvenes y a través de programas de fútbol impulsadas por organizaciones con base territorial han logrado cambiar positivamente para sus comunidades.</p>
                    <p>Asimismo, en este contexto se presentó Juan Roman Aguiló, quién brindó una charla motivacional. "Juanro", como él mismo se hace llamar, es un Conferencista Motivacional optimista, apasionado por el deporte y amante de los grandes desafíos. Nació sin brazos, por lo que tuvo que desarrollar sus pies como herramienta de vida. Perdiendo el miedo a ser diferente, ha utilizado la creatividad para superar las barreras en su vida, su actitud positiva y mentalidad de superación lo han convertido en un ganador.</p>
                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
             <div className="space-y-6 pt-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-orange pl-4 flex items-center gap-2">
                   <Trophy className="w-8 h-8 text-accent-orange" aria-hidden="true" />
                   Torneo de Fútbol 3 en el Predio de AFA
                </h2>
                <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                    <p>La Asociación del Fútbol Argentino y El Club Atlético San Lorenzo de Almagro albergaron el apasionante Torneo de Fútbol 3 que se desarrolló como eje central del Festival Latinoamericano. La metodología que cuenta con tres tiempo donde los valores, el respeto y la solidaridad son tan importantes como los goles convertidos.</p>
                    <p>La jornada inaugural se desarrolló en el verde césped de la Ciudad Deportiva del Club Atlético San Lorenzo de Almagro donde las organizaciones participantes pudieron desfilar ante la atenta mirada de autoridades y el público presente. Banderas de 10 países flamearon y desfilaron al ritmo de la murga Estacatto. Luego se dio inicio formal con el encendido de la antorcha olímpica.</p>
                    <p>La segunda jornada del Torneo se realizó en el Predio Julio H. Grondona que posee la Asociación del Fútbol Argentino en Ezeiza. En el mismo césped donde entrenan los mejores jugadores de argentina, los deportistas del Festival pudieron demostrar el valor del fútbol para la transformación social. Emocionantes partidos se jugaron y tuvieron su cierre con el presidente de la AFA, Claudio "Chiqui" Tapia, quien recibió una placa por su destacado compromiso con la inclusión social.</p>
                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4">
                   Partido Exhibición "Fútbol por la Inclusión"
                </h2>
                <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                    <p>En alianza con la Fundación Estudiantes de la Plata, se desarrolló un partido exhibición que nos permitió promover el mensaje del "fútbol por la Inclusión". Esta actividad se desarrolló el día domingo 5 de noviembre en la República de los Niños, el primer parque temático, educativo de Latinoamérica.</p>
                    <p>La presencia de Juan Sebastián Verón permitió que los jóvenes líderes de las organizaciones de Latinoamérica pudieran demostrar el valor del fútbol para el desarrollo y la transformación social. Sin lugar a dudas el Partido "Fútbol por la Inclusión" brindó un marco excepcional para la Ceremonia de Clausura del Festival Latinoamericano de Fútbol 3.</p>
                    <p>Luego del partido llegó el momento más emotivo del Festival: la Ceremonia de Premiación donde se reconocieron a todos los jugadores, jóvenes líderes, voluntarios, colaboradores y organizadores del Festival. Cada integrante recibió su medalla y se entregó la copa de campeón a los ganadores del encuentro Latinoamericano.</p>
                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-blue pl-4 mb-8">
                   16 Organizaciones de 10 Países
                </h2>
                <div className="space-y-12">
                    {orgLatam.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="text-2xl font-bold text-accent-blue mb-4 border-b border-gray-200 pb-2">{group.country}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.orgs.map((org, oidx) => (
                                    <div key={oidx} className="bg-gray-50 border border-gray-100 p-6 rounded-xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                                        <img src={org.img} alt={`Logo de ${org.n}`} className="w-[100px] h-[100px] object-contain mb-4 bg-white rounded-lg p-2 shadow-sm" />
                                        <h4 className="font-bold text-secondary text-lg mb-2">{org.n}</h4>
                                        <p className="text-sm text-text-muted">{org.p}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
