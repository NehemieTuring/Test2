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
}