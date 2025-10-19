"use client";

import React, { useState } from 'react';
import { Car, Users, MapPin, Bell, TrendingUp, Settings, Search, Filter, Download, Plus, Edit, Trash2, Eye, History, AlertTriangle, CheckCircle, XCircle, Navigation, Fuel, Calendar, FileText, Phone, Mail, MapPinned, Clock } from 'lucide-react';

// ==================== TYPES ====================
type Vehicle = {
  id: string;
  immatriculation: string;
  marque: string;
  modele: string;
  statut: 'Actif' | 'En maintenance' | 'Inactif';
  kilometrage: number;
  conducteur: string;
  position: string;
  carburant: number;
  photo: string;
};

type Conducteur = {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  statut: 'Actif' | 'En congé' | 'Inactif';
  vehicule: string;
  score: number;
  alertes: number;
  distance: number;
  telephone: string;
  email: string;
};

type Alerte = {
  id: string;
  type: string;
  gravite: 'Critique' | 'Moyenne' | 'Faible';
  date: string;
  vehicule: string;
  conducteur: string;
  localisation: string;
  statut: 'Non traitée' | 'En cours' | 'Résolue';
};

// ==================== DONNÉES FICTIVES ====================
const vehiculesData: Vehicle[] = [
  { id: '1', immatriculation: 'AB-123-CD', marque: 'Toyota', modele: 'Hilux', statut: 'Actif', kilometrage: 45230, conducteur: 'Jean Dupont', position: 'Yaoundé Centre', carburant: 75, photo: '🚗' },
  { id: '2', immatriculation: 'EF-456-GH', marque: 'Nissan', modele: 'Patrol', statut: 'Actif', kilometrage: 32100, conducteur: 'Marie Kamga', position: 'Douala', carburant: 50, photo: '🚙' },
  { id: '3', immatriculation: 'IJ-789-KL', marque: 'Mercedes', modele: 'Sprinter', statut: 'En maintenance', kilometrage: 78900, conducteur: '-', position: 'Garage Central', carburant: 20, photo: '🚐' },
  { id: '4', immatriculation: 'MN-012-OP', marque: 'Isuzu', modele: 'D-Max', statut: 'Actif', kilometrage: 23450, conducteur: 'Paul Ngono', position: 'Bafoussam', carburant: 90, photo: '🚗' },
];

const conducteursData: Conducteur[] = [
  { id: '1', nom: 'Dupont', prenom: 'Jean', photo: '👨', statut: 'Actif', vehicule: 'AB-123-CD', score: 85, alertes: 2, distance: 1250, telephone: '+237 6XX XXX XXX', email: 'j.dupont@fleet.cm' },
  { id: '2', nom: 'Kamga', prenom: 'Marie', photo: '👩', statut: 'Actif', vehicule: 'EF-456-GH', score: 92, alertes: 0, distance: 980, telephone: '+237 6XX XXX XXX', email: 'm.kamga@fleet.cm' },
  { id: '3', nom: 'Ngono', prenom: 'Paul', photo: '👨', statut: 'Actif', vehicule: 'MN-012-OP', score: 78, alertes: 5, distance: 1520, telephone: '+237 6XX XXX XXX', email: 'p.ngono@fleet.cm' },
  { id: '4', nom: 'Bella', prenom: 'Sophie', photo: '👩', statut: 'En congé', vehicule: '-', score: 88, alertes: 1, distance: 0, telephone: '+237 6XX XXX XXX', email: 's.bella@fleet.cm' },
];

const alertesData: Alerte[] = [
  { id: '1', type: 'Excès de vitesse', gravite: 'Critique', date: '2025-10-17 14:30', vehicule: 'AB-123-CD', conducteur: 'Jean Dupont', localisation: 'Route Yaoundé-Douala', statut: 'Non traitée' },
  { id: '2', type: 'Freinage brusque', gravite: 'Moyenne', date: '2025-10-17 12:15', vehicule: 'MN-012-OP', conducteur: 'Paul Ngono', localisation: 'Bafoussam Centre', statut: 'En cours' },
  { id: '3', type: 'Maintenance requise', gravite: 'Moyenne', date: '2025-10-17 09:00', vehicule: 'IJ-789-KL', conducteur: '-', localisation: 'Garage Central', statut: 'Résolue' },
  { id: '4', type: 'Zone interdite', gravite: 'Critique', date: '2025-10-16 18:45', vehicule: 'EF-456-GH', conducteur: 'Marie Kamga', localisation: 'Zone industrielle', statut: 'Résolue' },
];

// ==================== COMPOSANT PRINCIPAL ====================
export default function FleetControlApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedConducteur, setSelectedConducteur] = useState<Conducteur | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'infos' | 'historique'>('infos');

  // ==================== NAVIGATION ====================
  const NavButton = ({ icon: Icon, label, page }: any) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
        currentPage === page ? 'bg-white text-green-700' : 'text-white hover:bg-green-600'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  // ==================== MODAL ====================
  const Modal = ({ onClose, children }: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {modalType === 'infos' ? 'Informations détaillées' : 'Historique'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  // ==================== PAGE VÉHICULES ====================
  const VehiculesPage = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Véhicules</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
          <Plus size={20} />
          Ajouter un véhicule
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un véhicule..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter size={20} />
          Filtres
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehiculesData.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">{vehicle.photo}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                vehicle.statut === 'Actif' ? 'bg-green-100 text-green-800' :
                vehicle.statut === 'En maintenance' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {vehicle.statut}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-1">{vehicle.immatriculation}</h3>
            <p className="text-gray-600 mb-4">{vehicle.marque} {vehicle.modele}</p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Navigation size={16} />
                <span>{vehicle.kilometrage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{vehicle.conducteur}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{vehicle.position}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel size={16} />
                <span>Carburant: {vehicle.carburant}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setModalType('infos');
                  setShowModal(true);
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <Eye size={16} />
                Infos
              </button>
              <button
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setModalType('historique');
                  setShowModal(true);
                }}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700"
              >
                <History size={16} />
                Historique
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==================== PAGE CONDUCTEURS ====================
  const ConducteursPage = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Conducteurs</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
          <Plus size={20} />
          Ajouter un conducteur
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un conducteur..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter size={20} />
          Filtres
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conducteursData.map((conducteur) => (
          <div key={conducteur.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">{conducteur.photo}</div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                conducteur.statut === 'Actif' ? 'bg-green-100 text-green-800' :
                conducteur.statut === 'En congé' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {conducteur.statut}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {conducteur.prenom} {conducteur.nom}
            </h3>
            <p className="text-gray-600 mb-4">Véhicule: {conducteur.vehicule}</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-700">{conducteur.score}</div>
                <div className="text-xs text-gray-600">Score</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded">
                <div className="text-lg font-bold text-orange-700">{conducteur.alertes}</div>
                <div className="text-xs text-gray-600">Alertes</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-700">{conducteur.distance}</div>
                <div className="text-xs text-gray-600">km</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedConducteur(conducteur);
                  setModalType('infos');
                  setShowModal(true);
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <Eye size={16} />
                Infos
              </button>
              <button
                onClick={() => {
                  setSelectedConducteur(conducteur);
                  setModalType('historique');
                  setShowModal(true);
                }}
                className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700"
              >
                <History size={16} />
                Historique
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==================== PAGE GPS ====================
  const GPSPage = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Carte GPS - Suivi en temps réel</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Véhicules actifs</h3>
          <div className="space-y-2">
            {vehiculesData.filter(v => v.statut === 'Actif').map((vehicle) => (
              <div key={vehicle.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-sm">{vehicle.immatriculation}</span>
                </div>
                <p className="text-xs text-gray-600">{vehicle.conducteur}</p>
                <p className="text-xs text-gray-500">{vehicle.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-4">
          <div className="bg-gray-100 h-[600px] rounded-lg flex items-center justify-center relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-white px-3 py-2 rounded shadow-md hover:bg-gray-50">
                <MapPinned size={20} />
              </button>
              <button className="bg-white px-3 py-2 rounded shadow-md hover:bg-gray-50">
                <Filter size={20} />
              </button>
            </div>
            <div className="text-center text-gray-500">
              <MapPin size={64} className="mx-auto mb-4" />
              <p className="text-lg font-semibold">Carte interactive</p>
              <p className="text-sm">Intégration Google Maps / Mapbox ici</p>
              <p className="text-xs mt-2">Affichage en temps réel de tous les véhicules</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== PAGE ALERTES ====================
  const AlertesPage = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Alertes</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={32} />
            <div>
              <div className="text-2xl font-bold text-red-700">
                {alertesData.filter(a => a.statut === 'Non traitée').length}
              </div>
              <div className="text-sm text-gray-600">Non traitées</div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="text-orange-600" size={32} />
            <div>
              <div className="text-2xl font-bold text-orange-700">
                {alertesData.filter(a => a.statut === 'En cours').length}
              </div>
              <div className="text-sm text-gray-600">En cours</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={32} />
            <div>
              <div className="text-2xl font-bold text-green-700">
                {alertesData.filter(a => a.statut === 'Résolue').length}
              </div>
              <div className="text-sm text-gray-600">Résolues</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Gravité</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Véhicule</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Conducteur</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {alertesData.map((alerte) => (
                <tr key={alerte.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{alerte.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      alerte.gravite === 'Critique' ? 'bg-red-100 text-red-800' :
                      alerte.gravite === 'Moyenne' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alerte.gravite}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{alerte.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{alerte.vehicule}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{alerte.conducteur}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      alerte.statut === 'Non traitée' ? 'bg-red-100 text-red-800' :
                      alerte.statut === 'En cours' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alerte.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==================== PAGE RAPPORTS ====================
  const RapportsPage = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Rapports et Statistiques</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
          <Download size={20} />
          Exporter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-2">
            <TrendingUp className="text-green-600" size={24} />
            <span className="text-xs text-green-600 font-semibold">+18%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">2,450 km</div>
          <div className="text-sm text-gray-600">Distance totale</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-2">
            <Car className="text-blue-600" size={24} />
            <span className="text-xs text-blue-600 font-semibold">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">24</div>
          <div className="text-sm text-gray-600">Véhicules actifs</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex justify-between items-start mb-2">
            <Fuel className="text-orange-600" size={24} />
            <span className="text-xs text-red-600 font-semibold">+8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">1,245 L</div>
          <div className="text-sm text-gray-600">Consommation carburant</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start mb-2">
            <AlertTriangle className="text-purple-600" size={24} />
            <span className="text-xs text-red-600 font-semibold">-8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">7</div>
          <div className="text-sm text-gray-600">Alertes actives</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Utilisation des véhicules</h3>
          <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-2" />
              <p>Graphique d'utilisation</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Performance des conducteurs</h3>
          <div className="bg-gray-100 h-64 rounded flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Users size={48} className="mx-auto mb-2" />
              <p>Classement des conducteurs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Coûts mensuels</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Carburant</span>
              <span className="font-semibold text-gray-800">450,000 FCFA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Maintenance</span>
              <span className="font-semibold text-gray-800">125,000 FCFA</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm text-gray-700">Assurances</span>
              <span className="font-semibold text-gray-800">85,000 FCFA</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Alertes par type</h3>
          <div className="space-y-2">
            {[
              { type: 'Excès de vitesse', count: 12, color: 'bg-red-500' },
              { type: 'Freinage brusque', count: 8, color: 'bg-orange-500' },
              { type: 'Maintenance', count: 5, color: 'bg-yellow-500' },
              { type: 'Zone interdite', count: 3, color: 'bg-purple-500' },
            ].map((item) => (
              <div key={item.type}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{item.type}</span>
                  <span className="font-semibold text-gray-800">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / 12) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== DASHBOARD ====================
  const DashboardPage = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-start mb-2">
            <Car className="text-green-600" size={32} />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">+12%</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">24</div>
          <div className="text-sm text-gray-600">Véhicules actifs</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex justify-between items-start mb-2">
            <Users className="text-orange-600" size={32} />
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">+5%</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">18</div>
          <div className="text-sm text-gray-600">Conducteurs</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-start mb-2">
            <AlertTriangle className="text-red-600" size={32} />
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">-8%</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">7</div>
          <div className="text-sm text-gray-600">Alertes actives</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start mb-2">
            <TrendingUp className="text-blue-600" size={32} />
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">+18%</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">2,450 km</div>
          <div className="text-sm text-gray-600">Distance totale</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Activité récente</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <Car className="text-blue-600" size={20} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">Nouveau trajet démarré</p>
                <p className="text-xs text-gray-600">AB-123-CD • Il y a 5 min</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <AlertTriangle className="text-orange-600" size={20} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">Alerte freinage brusque</p>
                <p className="text-xs text-gray-600">MN-012-OP • Il y a 15 min</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <CheckCircle className="text-green-600" size={20} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">Maintenance terminée</p>
                <p className="text-xs text-gray-600">IJ-789-KL • Il y a 1h</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Véhicules en circulation</h3>
          <div className="space-y-2">
            {vehiculesData.filter(v => v.statut === 'Actif').map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{vehicle.photo}</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{vehicle.immatriculation}</p>
                    <p className="text-xs text-gray-600">{vehicle.conducteur}</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ==================== MODAL CONTENU ====================
  const VehicleInfosModal = ({ vehicle }: { vehicle: Vehicle }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-600">Immatriculation</label>
          <p className="text-lg text-gray-800">{vehicle.immatriculation}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Statut</label>
          <p className="text-lg text-gray-800">{vehicle.statut}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Marque</label>
          <p className="text-lg text-gray-800">{vehicle.marque}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Modèle</label>
          <p className="text-lg text-gray-800">{vehicle.modele}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Kilométrage</label>
          <p className="text-lg text-gray-800">{vehicle.kilometrage.toLocaleString()} km</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Carburant</label>
          <p className="text-lg text-gray-800">{vehicle.carburant}%</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-3">Documents</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              <span className="text-sm">Carte grise</span>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <Download size={18} />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              <span className="text-sm">Assurance</span>
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const VehicleHistoriqueModal = ({ vehicle }: { vehicle: Vehicle }) => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800">Historique des trajets</h4>
      <div className="space-y-2">
        {[
          { date: '17/10/2025', depart: 'Yaoundé', arrivee: 'Douala', distance: '250 km', duree: '4h30' },
          { date: '16/10/2025', depart: 'Douala', arrivee: 'Bafoussam', distance: '180 km', duree: '3h15' },
          { date: '15/10/2025', depart: 'Bafoussam', arrivee: 'Yaoundé', distance: '200 km', duree: '3h45' },
        ].map((trajet, idx) => (
          <div key={idx} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-gray-800">{trajet.date}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Terminé</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span>{trajet.depart} → {trajet.arrivee}</span>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>Distance: {trajet.distance}</span>
              <span>Durée: {trajet.duree}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ConducteurInfosModal = ({ conducteur }: { conducteur: Conducteur }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-600">Nom complet</label>
          <p className="text-lg text-gray-800">{conducteur.prenom} {conducteur.nom}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Statut</label>
          <p className="text-lg text-gray-800">{conducteur.statut}</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Téléphone</label>
          <p className="text-lg text-gray-800 flex items-center gap-2">
            <Phone size={16} />
            {conducteur.telephone}
          </p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <p className="text-lg text-gray-800 flex items-center gap-2">
            <Mail size={16} />
            {conducteur.email}
          </p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Score de conduite</label>
          <p className="text-lg text-gray-800">{conducteur.score}/100</p>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Véhicule assigné</label>
          <p className="text-lg text-gray-800">{conducteur.vehicule}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-3">Statistiques</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-700">{conducteur.score}</div>
            <div className="text-xs text-gray-600">Score moyen</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded">
            <div className="text-2xl font-bold text-orange-700">{conducteur.alertes}</div>
            <div className="text-xs text-gray-600">Alertes ce mois</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-700">{conducteur.distance}</div>
            <div className="text-xs text-gray-600">km parcourus</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ConducteurHistoriqueModal = ({ conducteur }: { conducteur: Conducteur }) => (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800">Historique de conduite</h4>
      <div className="space-y-2">
        {[
          { date: '17/10/2025', vehicule: 'AB-123-CD', distance: '250 km', score: 88, alertes: 1 },
          { date: '16/10/2025', vehicule: 'AB-123-CD', distance: '180 km', score: 92, alertes: 0 },
          { date: '15/10/2025', vehicule: 'EF-456-GH', distance: '200 km', score: 85, alertes: 1 },
        ].map((jour, idx) => (
          <div key={idx} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-gray-800">{jour.date}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{jour.vehicule}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Distance:</span>
                <p className="font-semibold">{jour.distance}</p>
              </div>
              <div>
                <span className="text-gray-600">Score:</span>
                <p className="font-semibold text-green-600">{jour.score}/100</p>
              </div>
              <div>
                <span className="text-gray-600">Alertes:</span>
                <p className="font-semibold text-orange-600">{jour.alertes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==================== RENDER ====================
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white flex flex-col">
        <div className="p-6 border-b border-green-600">
          <div className="flex items-center gap-3">
            <Car size={32} />
            <div>
              <h1 className="text-xl font-bold">FleetControl</h1>
              <p className="text-xs text-green-200">Gestion de flotte</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavButton icon={TrendingUp} label="Tableau de bord" page="dashboard" />
          <NavButton icon={Car} label="Véhicules" page="vehicules" />
          <NavButton icon={Users} label="Conducteurs" page="conducteurs" />
          <NavButton icon={MapPin} label="Carte GPS" page="gps" />
          <NavButton icon={Bell} label="Alertes" page="alertes" />
          <NavButton icon={TrendingUp} label="Rapports" page="rapports" />
        </nav>

        <div className="p-4 border-t border-green-600">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white hover:bg-green-600">
            <Settings size={20} />
            <span>Paramètres</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'vehicules' && <VehiculesPage />}
          {currentPage === 'conducteurs' && <ConducteursPage />}
          {currentPage === 'gps' && <GPSPage />}
          {currentPage === 'alertes' && <AlertesPage />}
          {currentPage === 'rapports' && <RapportsPage />}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {selectedVehicle && modalType === 'infos' && <VehicleInfosModal vehicle={selectedVehicle} />}
          {selectedVehicle && modalType === 'historique' && <VehicleHistoriqueModal vehicle={selectedVehicle} />}
          {selectedConducteur && modalType === 'infos' && <ConducteurInfosModal conducteur={selectedConducteur} />}
          {selectedConducteur && modalType === 'historique' && <ConducteurHistoriqueModal conducteur={selectedConducteur} />}
        </Modal>
      )}
    </div>
  );
}