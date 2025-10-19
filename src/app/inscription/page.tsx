// app/inscription/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, Building2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Inscription() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Vérifier si les mots de passe correspondent
    if (name === 'confirmPassword' || name === 'password') {
      const pass = name === 'password' ? value : formData.password;
      const confirm = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordMatch(pass === confirm || confirm === '');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      if (!passwordMatch) {
        setError('Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        setLoading(false);
        return;
      }

      // Validation email simple
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Veuillez entrer un email valide');
        setLoading(false);
        return;
      }

      // Appel API pour créer le compte
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erreur lors de l\'inscription');
        setLoading(false);
        return;
      }

      // Stocker les données et rediriger
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      // Rediriger vers le dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 border-4 border-green-600">
        {/* Back Button */}
        <Link href="/connexion">
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-6 transition-all">
            <ArrowLeft size={20} />
            Retour
          </button>
        </Link>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-600 rounded-lg p-3">
            <span className="text-white font-bold text-2xl">FC</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Créer un compte
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Rejoignez FleetControl dès maintenant
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nom complet *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Jean Dupont"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <User
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <Mail
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Téléphone
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="+237 _ _ _ _ _ _ _ _ _"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <Phone
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>

          {/* Company Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Entreprise
            </label>
            <div className="relative">
              <input
                type="text"
                name="company"
                placeholder="Nom de votre entreprise"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <Building2
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mot de passe *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <Lock
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Minimum 6 caractères
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirmer mot de passe *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                  !passwordMatch && formData.confirmPassword
                    ? 'border-red-500 focus:ring-red-600'
                    : 'border-gray-300 focus:ring-green-600'
                }`}
              />
              <Lock
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!passwordMatch && formData.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                ⚠️ Les mots de passe ne correspondent pas
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading || !passwordMatch}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Inscription en cours...
              </>
            ) : (
              'Créer un compte'
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-gray-600">
            En créant un compte, vous acceptez nos{' '}
            <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
              conditions d'utilisation
            </a>
          </p>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          Vous avez déjà un compte?{' '}
          <Link href="/connexion">
            <span className="text-green-600 hover:text-green-700 font-semibold cursor-pointer">
              Se connecter
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}