import { Car } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                <Car size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">FleetControl</span>
            </div>
            <p className="text-gray-400 text-sm">
              La solution complète pour la gestion de votre flotte automobile.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-green-500">Produit</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button className="hover:text-white transition-colors">
                  Fonctionnalités
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Tarifs
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Intégrations
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  API
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-orange-500">Entreprise</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button className="hover:text-white transition-colors">
                  À propos
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Carrières
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-green-500">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button className="hover:text-white transition-colors">
                  Centre d'aide
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Documentation
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Statut
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Politique de confidentialité
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 FleetControl. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}