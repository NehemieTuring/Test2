export default function CTASection() {
  return (
    <section id = "cta" className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-800">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          Prêt à optimiser votre flotte ?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Rejoignez des centaines d'entreprises qui ont déjà amélioré leur
          gestion de flotte
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            Essai gratuit 30 jours
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-green-700 transition-all">
            Contactez-nous
          </button>
        </div>
      </div>
    </section>
  );
}

/* C'est la partie ou on demande au client de nous contacter ou de commencer un essais gratuit */