import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jean-Claude Mbarga",
    company: "TransExpress SARL",
    role: "Directeur des Opérations",
    content:
      "FleetControl a transformé notre gestion de flotte. Nous avons réduit nos coûts de 30% en 6 mois.",
    rating: 5,
  },
  {
    name: "Marie Fosso",
    company: "LogiCam SA",
    role: "Responsable Logistique",
    content:
      "L'interface est intuitive et le support client est exceptionnel. Je recommande vivement !",
    rating: 5,
  },
  {
    name: "Alain Tchinda",
    company: "AutoFleet Services",
    role: "CEO",
    content:
      "Une solution complète qui répond à tous nos besoins. Les rapports détaillés sont un vrai plus.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id = "testimonials" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez ce que nos clients pensent de FleetControl
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-green-600 hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-orange-500 text-orange-500"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/*PERMET D'AFFICHER LA PAGE DES CLIENTS QUI FONTS CONFIANCE */