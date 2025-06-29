import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Star, Stethoscope } from 'lucide-react';
import { Input } from '../ui';
import ClinicCard from './ClinicCard';
import { apiService } from '../../services/ApiService';

const ClinicsList = () => {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [clinicsData, doctorsData] = await Promise.all([
        apiService.getClinics(),
        apiService.getDoctors()
      ]);
      setClinics(clinicsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDoctorsForClinic = (clinicId) => {
    return doctors.filter(doctor => doctor.clinicId === clinicId);
  };

  const handleSelectClinic = (clinic) => {
    navigate(`/clinics/${clinic.id}`);
  };

  const handleSelectDoctor = (doctor) => {
    navigate(`/doctors/${doctor.id}`);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search clinics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Clinics List */}
      <div className="space-y-6">
        {filteredClinics.map((clinic) => {
          const clinicDoctors = getDoctorsForClinic(clinic.id);
          return (
            <div key={clinic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ClinicCard
                clinic={clinic}
                onSelect={handleSelectClinic}
              />
              
              {/* Doctors Section */}
              {clinicDoctors.length > 0 && (
                <div className="border-t border-gray-100 p-4">
                  <div className="flex items-center mb-3">
                    <Stethoscope className="h-4 w-4 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Doctors at this clinic</h3>
                  </div>
                  <div className="space-y-2">
                    {clinicDoctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        onClick={() => handleSelectDoctor(doctor)}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderStars(doctor.rating)}
                          </div>
                          <span className="text-sm text-gray-600">({doctor.reviewCount})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredClinics.length === 0 && (
        <div className="text-center py-8">
          <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No clinics found</p>
        </div>
      )}
    </div>
  );
};

export default ClinicsList;