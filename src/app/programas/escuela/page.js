import { GraduationCap, MapPin, Users, Target, BookOpen } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Escuela de Fútbol Inclusivo - Programas",
  description: "Propuesta deportiva formativa de la Asociación Civil Andar para niños y jóvenes.",
};

export default function Escuela() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Escuela de Fútbol Inclusivo</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
               Formando valores a través de la metodología Fútbol 3 y Fútbol Inclusivo
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" aria-hidden="true" />
                Fundamentación
              </h2>
              <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                 <p>El proyecto de Escuela de Fútbol Inclusivo (EFI) se propone enfrentar principalmente la falta de oportunidades para el desarrollo de prácticas deportivas inclusivas, para el desarrollo de la mismo se cuenta con el involucramiento de la comunidad en la habilitación de espacios acordes a prácticas deportivas en espacios de calidad.</p>
                 <p>Los participantes que asisten a la (EFI) provienen de comunidades vulnerables, de escuelas especiales y comunes de los barrios de la localidad de Moreno, siendo este distrito uno de los más pobres del conurbano Bonaerense. Muchos de estos niños y niñas requieren de asistencia para la interpretación de los entrenamientos para el Juego en sus tres componentes (acuerdos – partido – reflexión) a través del lenguaje de señas, muchos de los niños y niñas requieren de la adaptación de los contenidos de los componentes del juego a través de lenguaje sencillo.</p>
                 <p>El uso de instalaciones adaptadas, accesibles y de calidad, permite a los niños y niñas desarrollar habilidades de la vida diaria tales como los hábitos saludables de higiene, participar en un entorno amigable y la utilización de los elementos para el entrenamiento y para las practicas del fútbol.</p>
                 <p>Con estímulos semanales que mejoran su condición física y el acceso a las relaciones sociales e interpersonales promoviendo el fortalecimiento de su autoestima, capacidad de tomar decisiones, capacidad de escucha y ser parte de un equipo y compartirlo con amigos</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-6">
                  <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-accent-orange" aria-hidden="true"/>
                      Los objetivos centrales de la EFI son:
                  </h3>
                  <ul className="space-y-3 ms-6 text-lg text-text-muted list-disc marker:text-primary">
                      <li>Acercar a la población de personas con y sin discapacidad de entre 6 y 18 años la metodología del fútbol inclusivo como un espacio de inclusión y encuentro a través del deporte para desarrollar y potenciar sus talentos.</li>
                      <li>Desarrollar a través del entrenamiento sistemático una preparación adecuada física y en valores, que respeta la diversidad como potencial humano.</li>
                      <li>Concientizar acerca de la importancia de la generación de espacios comunitarias abiertos e inclusivos, donde se encuentren y compartan actividades personas con y sin discapacidad, con los apoyos y ajustes razonables necesarios para una verdadera inclusión.</li>
                  </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-6 pt-8 border-t border-gray-100">
               <h2 className="text-3xl font-bold text-secondary border-l-4 border-accent-blue pl-4">
                Metodología
              </h2>
              <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                 <p>La Escuela de Fútbol Inclusivo es una iniciativa innovadora de inclusión en nuestro país que permite la participación activa de niños y niñas con y sin discapacidad, familias, docentes y comunidad en el juego del fútbol, promoviendo el desarrollo y la unificación de tres metodologías: Fútbol 3, Fútbol Inclusivo y Fútbol Base. Dicha práctica se resume fundamentado los siguientes componentes:</p>
                 <ul className="space-y-4 list-none pl-0">
                    <li className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                      <strong className="text-accent-blue block text-xl mb-1">LOS ACUERDOS:</strong>
                      es el espacio en el que se promueve la autodeterminación en la toma de decisiones el desarrollo de las relaciones interpersonales en la construcción de relaciones sociales positivas, la capacidad de escucha y empatía.
                    </li>
                    <li className="bg-orange-50/50 p-4 rounded-lg border border-orange-100">
                      <strong className="text-accent-orange block text-xl mb-1">EL PARTIDO:</strong>
                      permite poner en evidencia su bienestar físico y poniendo a prueba sus habilidades, liberar endorfinas experimentando sentimientos de bienestar, canalizando sentimientos negativos y stress, desafiando su mejora dia a dia tanto en lo deportivo como en el desarrollo de hábitos saludables de la vida diaria, de higiene personal, alimentación saludable y entrenamiento sistemático.
                    </li>
                    <li className="bg-green-50/50 p-4 rounded-lg border border-green-100">
                      <strong className="text-primary block text-xl mb-1">LA REFLEXIÓN:</strong>
                      es la herramienta facilitadora de los procesos de autoconocimiento, respeto por la opinión de los demás, capacidad de resiliencia transformando experiencias negativas en positivas. Este es el espacio en el cual los derechos y los procesos de Inclusión le permiten a todos ser escuchados, considerados iguales y de esta forma sentirse miembro y parte.
                    </li>
                 </ul>
                 <p>Estas tres instancias inspiradas en la metodología del fútbol 3 promueven la inclusión de las personas y el valor de la palabra, su desarrollo personal, el conocimiento, promoción y ejercicios de sus derechos, promueve la toma de decisiones y las mejores elecciones, sentirse parte de un equipo y miembro activo y participativo en la toma de decisiones y considerado igual .</p>
                 <p>Esta metodología se complementa con la metodología de Futbol Inclusivo, impulsada por Andar que ha desarrollado incorporando, a la metodología de Futbol 3, las herramientas de "testeo de habilidades individuales y colectivas" la interpretación en lenguaje de señas y la metodología de enseñanza a niños de 6 a 12 años desarrollada por la FIFA el fútbol base adaptándolo a lenguaje sencillo.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100">
              
              <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-secondary border-l-4 border-accent-orange pl-4 flex items-center gap-2">
                   <MapPin className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                   Desarrollo
                  </h2>
                  <div className="prose max-w-none text-lg text-text-muted leading-relaxed space-y-4">
                      <div>
                          <strong className="text-secondary block">¿Dónde se desarrollan las actividades?</strong>
                          Las actividades se desarrollan en el complejo deportivo Las Leñas Club, ubicado en Bartolomé Mitre esquina Remedios de Escalada, Moreno.
                      </div>
                       <div>
                          <strong className="text-secondary block">¿Horarios?</strong>
                          Martes y jueves en doble turno:<br/>
                          Mañana: de 10:00hs a 12:00hs.<br/>
                          Tarde: de 14:00hs a 16:00hs.
                      </div>
                       <div>
                          <strong className="text-secondary block">¿Quiénes pueden participar?</strong>
                          Pueden participar todos los niños y niñas con y sin discapacidad entre los 6 y 18 años de edad de nuestra localidad de Moreno.
                      </div>
                       <div>
                          <strong className="text-secondary block">¿Hay planillas de inscripción?</strong>
                          Para sumarse a la EFI pueden descargar la planilla de inscripción que consta de información del participante y un segmento de aptitud física mediante nuestro portal.
                      </div>
                  </div>
              </div>

              <div className="space-y-6">
                   <h2 className="text-2xl font-bold text-secondary border-l-4 border-primary pl-4 flex items-center gap-2">
                   <Users className="w-6 h-6 text-primary" aria-hidden="true" />
                   Organizaciones
                  </h2>
                  <div className="prose max-w-none text-lg text-text-muted leading-relaxed">
                      <p className="mb-4">Participan las escuelas especiales de Moreno:</p>
                      <ul className="space-y-2 list-disc ms-6 font-medium text-secondary marker:text-primary">
                          <li>Escuela 501</li>
                          <li>Escuela 502</li>
                          <li>Escuela 503</li>
                          <li>Escuela 504</li>
                          <li>Escuela 506</li>
                          <li>C.F.L. N°1</li>
                      </ul>
                  </div>
              </div>

            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
