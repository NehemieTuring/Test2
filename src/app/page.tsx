import LandingPage from "@/components/LandingPage";
/* Permet d'importer le landingpage*/

export default function Home() {
  return <LandingPage />;
}

/* Ce fichier ne contient pas de contenu lui-même.
Il sert juste à afficher le composant LandingPage sur la route / (page d’accueil).
C’est donc une page “wrapper” — Next.js l’exécute automatiquement quand un utilisateur visite ton site */