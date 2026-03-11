import { Users, UserCircle } from "lucide-react";

export const metadata = {
  title: "Comisión Directiva - Fútbol Inclusivo",
  description: "Conocé al equipo humano que lidera la Asociación Civil Andar.",
};

const boardMembers = [
  { name: "Juan Ramón Fiasche", role: "Presidente", img: null },
  { name: "Martín Petrelli", role: "Vicepresidente", img: null },
  { name: "Raúl Lucero", role: "Secretario", img: null },
];

export default function Comision() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-secondary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <Users className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Comisión Directiva</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
                Conocé al equipo que lidera la Asociación Civil Andar
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto">
          
          <div className="prose max-w-none mb-12 text-lg text-text-muted leading-relaxed">
             <p>Nuestro equipo está compuesto por profesionales, familias, y voluntarios comprometidos con los derechos de las personas con discapacidad. Creemos firmemente en la construcción colectiva y en el poder transformador de la comunidad trabajando por un objetivo en común: Una sociedad para todos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl shadow-sm text-center border border-gray-100 focus-within:ring-2 focus-within:ring-focus-ring" tabIndex={0}>
                  <UserCircle className="w-20 h-20 mx-auto text-gray-300 mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-secondary mb-1">{member.name}</h3>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm">
                    {member.role}
                  </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
