import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Stethoscope } from 'lucide-react';
import { Input } from '../ui';
import DoctorCard from './DoctorCard';
import { apiService } from '../../services/ApiService';

const DoctorsList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await apiService.getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectDoctor = (doctor) => {
    navigate(`/doctors/${doctor.id}`);
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
          placeholder="Shifokorlarni qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Doctors List */}
      <div className="space-y-3">
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onSelect={handleSelectDoctor}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <Stethoscope className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">Shifokorlar topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;