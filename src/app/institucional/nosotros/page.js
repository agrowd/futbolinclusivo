import { Building2, Heart, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Nosotros - La Asociación",
  description: "Propósito, equipo, historia, campo, aliados e impacto de la Asociación Civil Andar.",
};

export default function Nosotros() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nosotros</h1>
          <p className="text-xl opacity-90 leading-relaxed font-light">
            El fútbol como herramienta de inclusión social
          </p>
        </div>
      </section>

      {/* Main Content Content */}
      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4">
                EL FÚTBOL COMO HERRAMIENTA DE INCLUSIÓN SOCIAL
              </h2>
              <p className="text-lg leading-relaxed text-text-muted">
                El fútbol tiene un arraigo particular en la cultura argentina. Su poder es ampliamente movilizador y nos permite generar un espacio masivo de participación colectiva donde el eje no es la competencia si no la equiparación de oportunidades, brindando la posibilidad que todos y todas puedan jugar en igualdad de condiciones, independientemente de sus limitaciones.
              </p>
              <p className="text-lg leading-relaxed text-text-muted">
                El fútbol, en este caso, nos permite demostrar a la comunidad, a través de una estrategia incluyente, que las personas con discapacidad, cuando se respetan sus particularidades y se potencia sus virtudes, tienen mucho para aportar a sus comunidades. Buscamos a través de la revalorización colectiva y personal darle visibilidad a un colectivo que ve vulnerado sus derechos permanentemente en nuestro país. La situación de discapacidad que atraviesa una persona le impone prejuicios y limitaciones que no son propios de esas personas, si no el resultado de una sociedad que no toma en cuenta sus necesidades y peculiaridades, generando un círculo vicioso de estigmatización y exclusión.
              </p>
              <p className="text-lg leading-relaxed text-text-muted font-bold">
                Nuestro objetivo es claro: derribar mitos y aportar a una inclusión plena de todas las personas, más allá de la condición que puedan tener o atravesar.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-orange pl-4">
                UNA SOCIEDAD PLENAMENTE INCLUSIVA
              </h2>
              <p className="text-lg leading-relaxed text-text-muted">
                La Liga de Fútbol Inclusivo convoca a niños, niñas, jóvenes y adultos, con y sin discapacidad pertenecientes a Instituciones educativas, talleres protegidos, centros de dia, hogares, instituciones estatales y Organizaciones Sociales.
              </p>
              <p className="text-lg leading-relaxed text-text-muted">
                Nuestro eje es la plena inclusión social, es por ello que a través de nuestros diferentes programas brindamos valor a la diversidad, a través del desarrollo deportivo, promoción de la salud, iniciativas para la generación de oportunidades, desarrollo para la igualdad de género. Asimismo promovemos los derechos de los niños, niñas, jóvenes y adultos con discapacidad, teniendo en cuenta la protección del medio ambiente y la lucha contra todo tipo de discriminación.
              </p>
              <p className="text-lg leading-relaxed text-text-muted">
                Para los niños y niñas, jóvenes y adultos con discapacidad la Liga de Fútbol Inclusiva es la oportunidad de aprender, jugar, competir y compartir espacios comunitarios para la práctica y desarrollo del fútbol incluyente.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-blue pl-4 mb-8">
                Nuestros Aliados
              </h2>
              <div className="prose max-w-none text-lg leading-relaxed text-text-muted">
                
                <div className="mb-12">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                    <div className="flex-shrink-0">
                      <img src="https://futbolinclusivo.org.ar/app/uploads/2017/10/1-logo-addas.png" alt="Adidas Logo" className="w-[150px] object-contain" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-2">ADIDAS</h3>
                      <p>
                          ADIDAS Argentina y su Fundación acompañan a la Asociación Civil Andar desde el año 2007, la "Magia que ADIDAS Argentina le puso a nuestro Potrero", fue el punto de partida. A partir de este espacio Deportivo en Andar, se generaron una serie de acciones que nos han permitido mejorar el impacto que la "Liga de Fútbol Inclusiva" propone cada año y generar nuevas oportunidades tanto para la Fundación como para la Organización.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <div className="flex-shrink-0">
                            <img src="https://futbolinclusivo.org.ar/app/uploads/2017/10/2-street.png" alt="streetfootballworld Logo" className="w-[150px] h-[150px] object-contain" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-secondary mb-2">streetfootballworld</h3>
                            <p>
                                streetfootballworld respalda a una red mundial de organizaciones que utilizan el fútbol como una herramienta para empoderar a los jóvenes. A través de la conexión de los miembros de la red con socios de todo el mundo de los deportes, los negocios, la política y la filantropía, streetfootballworld trae poder global a las iniciativas locales. La Asociación Civil Andar y la Liga de Fútbol Inclusiva forman parte de esta Red Mundial que reconoce el trabajo de Andar en relación a la generación de oportunidades para las personas con discapacidad.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-secondary mb-2">FIFA Football for Hope</h3>
                            <p>
                                La FIFA cree que el fútbol es más que un juego. A través de su poder único y versátil, el fútbol puede unir a la gente, transformar sus vidas e inspirar a comunidades enteras. Para aprovechar el enorme potencial del fútbol y apoyar los proyectos comunitarios con base en este deporte, la FIFA lanzó la iniciativa Football for Hope en 2005. Su objetivo principal es ayudar a mejorar las vidas y expectativas de los jóvenes de todo el mundo. A través de un riguroso proceso de selección la FIFA seleccionó a la Asociación Civil Andar y otorgó un apoyo económico para el desarrolló de la Liga de Fútbol Inclusiva durante el periodo 2016-2017
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <div className="flex-shrink-0">
                            <img src="https://futbolinclusivo.org.ar/app/uploads/2017/10/logo-secretaria-deporte-2017.png" alt="Secretaria Deportes Logo" className="w-[150px] object-contain" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-secondary mb-2">Secretaria de Deportes de la Nación</h3>
                            <p>
                                La Secretaria de Deportes de la Nación ha brindado su apoyo a la Asociaciòn Civil Andar para expandir su desarrollo a través de la Liga Nacional de Fútbol Inclusivo y acompañò el desarrollo del Festival Latinoamericano de Fútbol 3 – Buenos Aires 2017.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <div className="flex-shrink-0">
                            <img src="https://futbolinclusivo.org.ar/app/uploads/2017/10/4-laureus.png" alt="Laureus Logo" className="w-[150px] object-contain" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-secondary mb-2">Fundación Laureus</h3>
                            <p>
                                A través de la articulación con la Fundación Laureus, la Asociación Civil Andar lleva adelante desde el año 2015 el proyecto de Escuelas de Fútbol Inclusivas. Esto permite brindar un espacio deportivo, formativo, recreativo y social para chicos de 6 a 15 años de la localidad de Moreno.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="hover:-translate-y-1 transition-transform">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/edelp.jpg" alt="Estudiantes LP" className="w-full h-auto object-contain mb-4 rounded-lg" />
                          <h3 className="text-xl font-bold text-secondary mb-2">Club Estudiantes de la Plata</h3>
                          <p>El Fútbol Inclusivo celebró este año la alianza entre la Fundación Estudiantes de la Plata y la Asociación Civil Andar. Esta articulación se inició con importantes acciones en conjunto, una de ellas es la organización del Partido "Fútbol por la Inclusión" que se desarrollará en el marco del Festival Latinoamericano de Fútbol 3.</p>
                      </div>
                      <div className="hover:-translate-y-1 transition-transform">
                            <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/casla.jpg" alt="San Lorenzo" className="w-full h-auto object-contain mb-4 rounded-lg" />
                            <h3 className="text-xl font-bold text-secondary mb-2">Club Atlético San Lorenzo de Almagro</h3>
                      </div>
                    </div>
                </div>

                 <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="hover:-translate-y-1 transition-transform">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/river.jpg" alt="River Plate" className="w-full h-auto object-contain mb-4 rounded-lg" />
                          <h3 className="text-xl font-bold text-secondary mb-2">Club Atlético River Plate</h3>
                          <p>El Club Atlético River Plate, a través de su Departamento de Filiales, River Sin Barreras y Fundación River, ha acompañado el desarrollo de la Liga de Fútbol Inclusiva desde el año 2003, siendo desde el año 2003 al 2010 y del 2013 al 2015 sede de las Finales y Ceremonia de Premiación del evento deportivo más importante para las personas con discapacidad de nuestro país. Asimismo durante los años 2009 y 2010 se organizó conjuntamente con el Club el evento “Fútbol por la Paz”, donde se reunieron deportistas con discapacidad, ex jugadores de River Plate y artistas de renombre.</p>
                      </div>
                      <div className="hover:-translate-y-1 transition-transform">
                            <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/afa.jpg" alt="AFA" className="w-full h-auto object-contain mb-4 rounded-lg" />
                            <h3 className="text-xl font-bold text-secondary mb-2">Asociación del Fútbol Argentino</h3>
                            <p>La Asociación del Fútbol Argentino y su presidente Claudio "Chiqui" Tapia brindaron su apoyo a la Liga de Fútbol Inclusiva y cedieron las instalaciones del Predio "Julio Humberto Grandono" para el desarrollo del Festival Latinoamericano de Fútbol 3, organizado por la LFI.</p>
                      </div>
                    </div>
                </div>

              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
