"use client";

// Import des hooks React pour gérer l'état et les effets
import { useState, useEffect } from "react";
// Import des icônes depuis lucide-react
import { Car, Menu, X } from "lucide-react";
// Import du composant Link de Next.js pour la navigation entre pages
import Link from "next/link";

export default function Navigation() {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // État pour savoir si l'utilisateur a scrollé (pour changer l'apparence de la navbar)
  const [scrolled, setScrolled] = useState(false);

  // useEffect pour détecter le scroll de la page
  useEffect(() => {
    // Fonction qui vérifie la position du scroll
    const handleScroll = () => {
      // Si on a scrollé plus de 50px, on active l'état "scrolled"
      setScrolled(window.scrollY > 50);
    };
    
    // Ajoute l'écouteur d'événement au scroll
    window.addEventListener("scroll", handleScroll);
    
    // Fonction de nettoyage pour retirer l'écouteur quand le composant est démonté
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'au montage

  return (
    // Navigation fixée en haut de la page (fixed) avec transition fluide
    // La classe change selon si on a scrollé ou non (fond transparent ou blanc)
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Conteneur principal avec largeur maximale et padding responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* SECTION LOGO */}
          {/* Link enveloppe le logo pour rediriger vers la page d'accueil */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            {/* Icône du logo avec dégradé vert */}
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <Car size={24} className="text-white" />
            </div>
            {/* Nom de l'application - couleur change selon le scroll */}
            <span
              className={`text-2xl font-bold ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              FleetControl
            </span>
          </Link>

          {/* MENU DESKTOP - Visible uniquement sur écrans moyens et plus (md:flex) */}
          <div className="hidden md:flex items-center gap-8">
            {/* Liens de navigation - utilisent des ancres (#) pour scroller vers les sections */}
            <a
              href="#features"
              className={`font-medium transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-600 hover:text-green-600"
                  : "text-white hover:text-green-200"
              }`}
            >
              Fonctionnalités
            </a>
            
            <a
              href="#pricing"
              className={`font-medium transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-600 hover:text-green-600"
                  : "text-white hover:text-green-200"
              }`}
            >
              Tarifs
            </a>
            
            <a
              href="#testimonials"
              className={`font-medium transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-600 hover:text-green-600"
                  : "text-white hover:text-green-200"
              }`}
            >
              Témoignages
            </a>
            
            <a
              href="#cta"
              className={`font-medium transition-colors cursor-pointer ${
                scrolled
                  ? "text-gray-600 hover:text-green-600"
                  : "text-white hover:text-green-200"
              }`}
            >
              Contact
            </a>
            
            {/* Boutons d'action - Restent des boutons car ils peuvent ouvrir des modales */}
            {/* Mais vous pouvez aussi les transformer en Link si besoin */}
            <Link
              href="/connexion"
              className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all"
            >
              Connexion
            </Link>
            
            <Link
              href="/essai-gratuit"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Essai gratuit
            </Link>
          </div>

          {/* BOUTON MENU MOBILE - Visible uniquement sur petits écrans */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu" // Accessibilité
          >
            {/* Affiche X si menu ouvert, sinon affiche icône hamburger */}
            {mobileMenuOpen ? (
              <X
                size={24}
                className={scrolled ? "text-gray-800" : "text-white"}
              />
            ) : (
              <Menu
                size={24}
                className={scrolled ? "text-gray-800" : "text-white"}
              />
            )}
          </button>
        </div>
      </div>

      {/* MENU MOBILE - Affiché seulement si mobileMenuOpen est true */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {/* Liens de navigation mobile avec ancres */}
            {/* onClick ferme le menu après le clic */}
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
            >
              Fonctionnalités
            </a>
            
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
            >
              Tarifs
            </a>
            
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
            >
              Témoignages
            </a>
            
            <a
              href="#cta"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
            >
              Contact
            </a>
            
            <Link
              href="/connexion"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold"
            >
              Connexion
            </Link>
            
            <Link
              href="/essai-gratuit"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/*Ce composant :
gère le menu principal du site,
s’adapte automatiquement au scroll et à la taille de l’écran,
rend le site responsive et élégant avec TailwindCSS + Lucide React.
C’est ce qui donne l’en-tête “moderne et fixe” typique des sites SaaS (comme FleetControl). */
/* C'est la barre de navigation tout en haut de notre page d'acceuil */