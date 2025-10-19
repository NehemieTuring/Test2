import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "25,000",
    period: "/mois",
    description: "Parfait pour les petites flottes",
    features: [
      "Jusqu'à 10 véhicules",
      "Localisation GPS en temps réel",
      "Rapports basiques",
      "Support par email",
      "Application mobile",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "65,000",
    period: "/mois",
    description: "Idéal pour les entreprises en croissance",
    features: [
      "Jusqu'à 50 véhicules",
      "Toutes les fonctionnalités Starter",
      "Alertes avancées",
      "Rapports personnalisés",
      "Support prioritaire 24/7",
      "Géofencing illimité",
      "API d'intégration",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    period: "",
    description: "Solution complète pour grandes flottes",
    features: [
      "Véhicules illimités",
      "Toutes les fonctionnalités Pro",
      "Manager dédié",
      "Formation personnalisée",
      "SLA garanti",
      "Déploiement on-premise",
      "Développement sur mesure",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id = "pricing" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Tarifs adaptés à chaque besoin
          </h2>
          <p className="text-xl text-gray-600">
            Choisissez le plan qui convient à votre entreprise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-green-600 to-green-700 text-white shadow-2xl transform scale-105 border-4 border-orange-500"
                  : "bg-gray-50 border-2 border-gray-200"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-2 ${
                  plan.highlighted ? "text-white" : "text-gray-800"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`mb-6 ${
                  plan.highlighted ? "text-green-100" : "text-gray-600"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className={`text-lg ${
                    plan.highlighted ? "text-green-100" : "text-gray-600"
                  }`}
                >
                  {" "}
                  FCFA{plan.period}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                  plan.highlighted
                    ? "bg-white text-green-700 hover:shadow-xl"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {plan.highlighted ? "Commencer maintenant" : "Choisir ce plan"}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <Check
                      size={20}
                      className={`flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? "text-white"
                          : "text-green-600"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted
                          ? "text-green-100"
                          : "text-gray-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}