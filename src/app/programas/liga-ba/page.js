import { Trophy, Calendar, CheckSquare, FileText, Medal, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Liga de Fútbol Inclusiva BA",
  description: "El torneo más grande de la Provincia de Buenos Aires para personas con y sin discapacidad.",
};

const statsZones = [
  { 
      name: "Zona A", 
      winner: "C.E.F. 123 A", 
      runnerUp: "CEDIMA", 
      semifinalists: ["ANDAR A", "P.D.I. LOS PIBES DEL DEFE"] 
  },
  { 
      name: "Zona B", 
      winner: "NOSOTROS TAMBIEN NOS MOVEMOS B", 
      runnerUp: "QUILMES B", 
      semifinalists: ["CEDIMA LOS PUMAS", "MERLO B"] 
  },
  { 
      name: "Zona C", 
      winner: "P.D.I. HALCONES DORADOS", 
      runnerUp: "P.D.I. EL CHAPE", 
      semifinalists: ["ANDAR C", "HORACIO SORIANI C"] 
  },
  { 
      name: "Zona D", 
      winner: "EL FUTURO", 
      runnerUp: "SANTA CLARA DE ASIS", 
      semifinalists: ["GENERAL RODRIGUEZ", "PROGRAMA ACOMPAÑANDO"] 
  },
  { 
      name: "Zona E", 
      winner: "PERTENECER E2", 
      runnerUp: "CILSA E1", 
      semifinalists: ["LOS 4 FANTASTICOS", "HURLINGHAM LOS DRAGONES E1"] 
  },
   { 
      name: "Zona F", 
      winner: "HORACIO SORIANI F2", 
      runnerUp: "FLORENCIO VARELA F1", 
      semifinalists: ["ALIKE LOS HALCONES", "AMIGOS DEL CORAZON F2"] 
  },
];

export default function LigaBA() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Liga de Fútbol Inclusiva BA</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
               Creando valores a través del deporte sistemático.
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <FadeIn>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4 flex items-center gap-3">
                   <Info className="w-8 h-8 text-primary" aria-hidden="true" />
                   Institucional e Historia
                </h2>
                <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                    <p>La Liga de Fútbol Inclusiva es un evento sistemático de fútbol para personas con y sin discapacidad creado por la Asociación Civil Andar.</p>
                    <p>El mismo se desarrolla desde el año 1998, en la ciudad de Moreno (Argentina) y se replica en diferentes puntos del país y de Latinoamérica. A través del fútbol se trabajan valores, se equiparan oportunidades y se construye una sociedad más inclusiva.</p>
                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
                 <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-blue pl-4">
                   Metodología (El Testeo)
                </h2>
                 <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                    <p>La practica deportiva y en especial el Fútbol es una herramienta que utilizamos para lograr la inclusión de las personas con discapacidad y dando una igualdad en las oportunidades. Es por ello que utilizamos el método del <strong>Testeo</strong> que evalúa las capacidades técnicas, tácticas y estratégicas individuales y colectivas de cada equipo que participa, teniendo una serie de Test y actividades con contenido didáctico y pedagógico para lograr la eficiencia y eficacia del testeo. Dando de esta manera un nivel apropiado a cada uno de los equipos para poder brindar las mismas oportunidades a todos, nucleando de esta manera a todos los equipos que tienen las mismas características.</p>
                    <p>Entendemos también que en la población con la cual trabajamos tenemos que tener por separado la participación del genero por eso existen zonas de juego para Varones y otras para Mujeres.</p>
                    <p className="bg-blue-50/50 p-4 border border-blue-100 rounded-lg text-secondary">
                        Cabe señalar que la inclusión con equipos integrados por personas con y sin discapacidad es un eje central de este movimiento.
                    </p>
                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
                 <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-orange pl-4 mb-8">
                   Equipos Participantes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/10/andar@2x.png" alt="A. Civil Andar" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">Asociación Civil Andar</h4>
                          <p className="text-sm text-text-muted">La Asociación Civil Andar es una organización social ubicada en Moreno, Provincia de Buenos Aires, que trabaja hace más de 20 años generando oportunidades innovadoras para el desarrollo creativo del potencial de las personas con discapacidad a través del trabajo, el deporte, el arte, la cultura y la salud, para mejorar su calidad de vida, afianzar sus vínculos familiares y promover su inclusión social.</p>
                      </div>
                  </div>

                  <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/logo-cilsa.jpg" alt="CILSA" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">CILSA - Buenos Aires</h4>
                          <p className="text-sm text-text-muted">CILSA es una ONG fundada en 1966 en la ciudad de Santa Fe. Su trabajo se enfoca en promover la inclusión plena de personas provenientes de sectores marginados de la sociedad como niños, niñas y adolescentes en situación de vulnerabilidad social y personas con discapacidad.</p>
                      </div>
                  </div>

                   <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/logo-fundacion-pertenecer.jpg" alt="Pertenecer" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">Fundación Pertenecer - San Isidro</h4>
                          <p className="text-sm text-text-muted">La Fundación Pertenecer se constituye como un centro de orientación, evaluación y formación a nivel social, cultural, laboral y educacional para facilitar a jóvenes y adultos con y sin discapacidad la posibilidad de una plena integración dentro de un proyecto de vida saludable.</p>
                      </div>
                  </div>

                  <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/logo-mostrando-caminos2.jpg" alt="Mostrando Caminos" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">Mostrando Caminos - Lobos</h4>
                          <p className="text-sm text-text-muted">La Asociación Civil “Mostrando Caminos” es una entidad de utilidad pública, sin ánimo de lucro conformada por un grupo ciudadanos lobenses voluntarios que advirtieron la necesidad de generar espacios de inclusión para niños de barrios periféricos y jóvenes con discapacidad.</p>
                      </div>
                  </div>

                   <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/logo-ideharcelas.jpg" alt="Ideharcelas" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">Ideharcelas - Morón</h4>
                          <p className="text-sm text-text-muted">IdeHarcelas es una ONG con perfil de inserción sociocomunitaria desarrollando aspectos artísticos, socio culturales; deportivo-recreativos y ocupacionales destinado a jóvenes y adultos con discapacidad mental.</p>
                      </div>
                  </div>

                  <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/logo-amigos-de-corazon.jpg" alt="Amigos de Corazon" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">Amigos de Corazón - Berisso</h4>
                          <p className="text-sm text-text-muted">Amigos de Corazón es una Asociación Civil conformada por un grupo de jóvenes con capacidades especiales que buscaba satisfacer necesidades diferentes, pero esencialmente la de un lugar de encuentro, de unión a sus integrantes.</p>
                      </div>
                  </div>

                  <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-[80px]">
                          <img src="https://futbolinclusivo.org.ar/app/uploads/2017/12/logo-atiadim.jpg" alt="ATIADIM" className="w-full object-contain" />
                      </div>
                      <div>
                          <h4 className="font-bold text-secondary mb-1">ATIADIM - Chivilcoy</h4>
                          <p className="text-sm text-text-muted">ATIADIM es una ONG de Chivilcoy (provincia de Buenos Aires) que brinda servicios para personas con discapacidad mental a través programas de inclusión laboral.</p>
                      </div>
                  </div>

                   <div className="col-span-1 md:col-span-2 mt-4 bg-gray-50 border border-gray-100 p-6 rounded-lg">
                      <h4 className="font-bold text-secondary mb-3">Municipios y Entidades Estatales</h4>
                      <div className="flex flex-wrap gap-4">
                          <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipio de Quilmes</span>
                          <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipio de Hurlingham</span>
                          <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipio de Marcos Paz</span>
                          <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipio de Merlo</span>
                          <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipio de Escobar</span>
                           <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipalidad de Ituzaingó</span>
                          <span className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-medium">Municipio de General Rodríguez</span>
                      </div>
                  </div>

                </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
               <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4 flex items-center justify-between">
                  <span>Estadísticas Finales LFI</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                 {statsZones.map((zone, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6 relative overflow-hidden focus-within:ring-2 focus-within:ring-focus-ring" tabIndex={0}>
                       <Trophy className="absolute -right-4 -top-4 w-24 h-24 text-gray-200 opacity-50" aria-hidden="true" />
                       <h3 className="text-2xl font-black text-secondary mb-4 relative z-10">{zone.name}</h3>
                       
                       <div className="space-y-3 relative z-10">
                          <div className="flex items-center gap-2">
                              <Medal className="w-5 h-5 text-yellow-500" aria-label="Campeón" />
                              <strong className="text-text">{zone.winner}</strong>
                          </div>
                           <div className="flex items-center gap-2">
                              <Medal className="w-5 h-5 text-gray-400" aria-label="Subcampeón" />
                              <span className="text-text-muted">{zone.runnerUp}</span>
                          </div>
                          
                          <div className="pt-3 border-t border-gray-200 mt-3">
                              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Semifinalistas</p>
                              <div className="space-y-1">
                                  {zone.semifinalists.map(semi => (
                                     <p key={semi} className="text-sm text-text-muted">{semi}</p>
                                  ))}
                              </div>
                          </div>
                       </div>
                    </div>
                 ))}
             </div>
          </div>

           {/* Historical Results Tabe */}
           <div className="space-y-6 pt-8 border-t border-gray-100">
             <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-blue pl-4 mb-6">
                Archivo Histórico: Resultados Zona A (2017)
             </h2>
             <p className="text-text-muted text-lg mb-4">
                La Liga de Fútbol Inclusiva conserva el historial de desempeño de todos sus años jugados. A continuación, el registro histórico de la Zona A del año 2017.
             </p>
             <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-left text-sm text-secondary min-w-[700px]">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-secondary border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4">Club</th>
                            <th scope="col" className="px-6 py-4 text-center">J</th>
                            <th scope="col" className="px-6 py-4 text-center">G</th>
                            <th scope="col" className="px-6 py-4 text-center">E</th>
                            <th scope="col" className="px-6 py-4 text-center">P</th>
                            <th scope="col" className="px-6 py-4 text-center">GF</th>
                            <th scope="col" className="px-6 py-4 text-center">GC</th>
                            <th scope="col" className="px-6 py-4 text-center">DF</th>
                            <th scope="col" className="px-6 py-4 text-center text-primary">Pts</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-primary">1</td>
                            <td className="px-6 py-4 font-bold text-secondary">CEDIMA</td>
                            <td className="px-6 py-4 text-center">8</td>
                            <td className="px-6 py-4 text-center">7</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">1</td>
                            <td className="px-6 py-4 text-center">28</td>
                            <td className="px-6 py-4 text-center">7</td>
                            <td className="px-6 py-4 text-center text-accent-blue font-bold">21</td>
                            <td className="px-6 py-4 text-center font-bold text-lg text-primary">21</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold">2</td>
                            <td className="px-6 py-4 font-medium text-secondary">C.E.F. 123 A</td>
                            <td className="px-6 py-4 text-center">8</td>
                            <td className="px-6 py-4 text-center">7</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">1</td>
                            <td className="px-6 py-4 text-center">13</td>
                            <td className="px-6 py-4 text-center">4</td>
                            <td className="px-6 py-4 text-center text-accent-blue font-bold">9</td>
                            <td className="px-6 py-4 text-center font-bold text-lg">21</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold">3</td>
                            <td className="px-6 py-4 font-medium text-secondary">ANDAR A</td>
                            <td className="px-6 py-4 text-center">7</td>
                            <td className="px-6 py-4 text-center">4</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">3</td>
                            <td className="px-6 py-4 text-center">17</td>
                            <td className="px-6 py-4 text-center">14</td>
                            <td className="px-6 py-4 text-center text-accent-blue font-bold">3</td>
                            <td className="px-6 py-4 text-center font-bold text-lg">12</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold">4</td>
                            <td className="px-6 py-4 font-medium text-secondary">P.D.I. LOS PIBES DEL DEFE</td>
                            <td className="px-6 py-4 text-center">7</td>
                            <td className="px-6 py-4 text-center">2</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">5</td>
                            <td className="px-6 py-4 text-center">4</td>
                            <td className="px-6 py-4 text-center">8</td>
                            <td className="px-6 py-4 text-center text-accent-orange font-bold">-4</td>
                            <td className="px-6 py-4 text-center font-bold text-lg">6</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold">5</td>
                            <td className="px-6 py-4 font-medium text-secondary">A.S.H. MERLO A</td>
                            <td className="px-6 py-4 text-center">6</td>
                            <td className="px-6 py-4 text-center">2</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">4</td>
                            <td className="px-6 py-4 text-center">10</td>
                            <td className="px-6 py-4 text-center">22</td>
                            <td className="px-6 py-4 text-center text-accent-orange font-bold">-12</td>
                            <td className="px-6 py-4 text-center font-bold text-lg">6</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold">6</td>
                            <td className="px-6 py-4 font-medium text-secondary">FLORENCIO VARELA A</td>
                            <td className="px-6 py-4 text-center">6</td>
                            <td className="px-6 py-4 text-center">1</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">5</td>
                            <td className="px-6 py-4 text-center">9</td>
                            <td className="px-6 py-4 text-center">12</td>
                            <td className="px-6 py-4 text-center text-accent-orange font-bold">-3</td>
                            <td className="px-6 py-4 text-center font-bold text-lg">3</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-bold">7</td>
                            <td className="px-6 py-4 font-medium text-secondary">P.D.I. PASION GUARANI</td>
                            <td className="px-6 py-4 text-center">6</td>
                            <td className="px-6 py-4 text-center">1</td>
                            <td className="px-6 py-4 text-center">0</td>
                            <td className="px-6 py-4 text-center">5</td>
                            <td className="px-6 py-4 text-center">5</td>
                            <td className="px-6 py-4 text-center">19</td>
                            <td className="px-6 py-4 text-center text-accent-orange font-bold">-14</td>
                            <td className="px-6 py-4 text-center font-bold text-lg">3</td>
                        </tr>
                    </tbody>
                </table>
               </div>
             </div>
          </FadeIn>

        </div>
      </section>

      {/* Action Bar */}
      <FadeIn delay={0.4} direction="none">
        <section className="bg-gray-50 py-12 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Completá el Listado de Buena Fe</h2>
              <p className="text-text-muted">La inscripción de equipos para la Liga BA se realiza 100% online.</p>
            </div>
            <Link 
              href="/inscripcion" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium text-lg w-full md:w-auto focus:ring-4 focus:ring-focus-ring outline-none"
            >
              <CheckSquare className="w-5 h-5" aria-hidden="true" />
              Inscribir Institución
            </Link>
        </div>
        </section>
      </FadeIn>
    </div>
  );
}
