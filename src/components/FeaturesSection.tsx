import {
  MapPin,
  Shield,
  BarChart3,
  Bell,
  Users,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Localisation GPS en temps réel",
    description:
      "Suivez tous vos véhicules sur une carte interactive avec mise à jour instantanée de leur position.",
  },
  {
    icon: Shield,
    title: "Sécurité avancée",
    description:
      "Alertes automatiques en cas d'anomalie, géofencing et historique complet des déplacements.",
  },
  {
    icon: BarChart3,
    title: "Rapports détaillés",
    description:
      "Analyses complètes de la consommation, distances parcourues et performances de votre flotte.",
  },
  {
    icon: Bell,
    title: "Alertes intelligentes",
    description:
      "Notifications push et email pour maintenance, infractions, niveau de carburant critique.",
  },
  {
    icon: Users,
    title: "Gestion des conducteurs",
    description:
      "Assignation des véhicules, suivi des performances et historique des trajets par conducteur.",
  },
  {
    icon: Clock,
    title: "Maintenance planifiée",
    description:
      "Rappels automatiques pour l'entretien régulier et suivi de l'historique de maintenance.",
  },
];

export default function FeaturesSection() {
  return (
    <section id = "features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Fonctionnalités puissantes pour votre entreprise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour gérer efficacement votre flotte
            automobile
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-green-600"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <feature.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/* ICI C'EST LA PAGES OÙ ON MONTRE LES FONCTIONNALITÉS DISPONIBLES AU CLIENT */