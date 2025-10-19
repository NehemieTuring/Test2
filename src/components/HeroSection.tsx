import { ArrowRight, Zap, Car } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-900">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Zap size={16} className="text-orange-400" />
              <span className="text-sm font-semibold">
                Essai gratuit de 30 jours
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Gérez votre flotte avec intelligence
            </h1>

            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              La solution tout-en-un pour optimiser vos opérations, réduire vos
              coûts et améliorer la sécurité de vos véhicules.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                Démarrer gratuitement
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-green-700 transition-all">
                Demander une démo
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-green-200 text-sm">Entreprises</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-green-200 text-sm">Véhicules</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-green-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <Car size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">
                          CM-1234-AB
                        </div>
                        <div className="text-gray-400 text-xs">
                          En route - Yaoundé
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm font-semibold">
                      85 km/h
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Car size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">
                          CM-5678-CD
                        </div>
                        <div className="text-gray-400 text-xs">
                          Stationnée - Douala
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm font-semibold">
                      0 km/h
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ICI C'EST LA PREMIÈRE PAGE QU'ON VOIT LORSQU'ON ENTRE DANS LE PROJET */