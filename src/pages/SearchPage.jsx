import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../services/ApiService';
import DoctorCard from '../components/doctors/DoctorCard';
import ClinicCard from '../components/clinics/ClinicCard';
import SearchFilters from '../components/search/SearchFilters';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('doctors');
  const [filters, setFilters] = useState({
    available: false,
    minRating: 0
  });

  useEffect(() => {
    const search = searchParams.get('q') || '';
    const spec = searchParams.get('specialty') || '';
    
    setSearchTerm(search);
    setSpecialty(spec);
    
    const fetchResults = async () => {
      try {
        setLoading(true);
        
        // Fetch doctors with filters
        const doctorsData = await apiService.getDoctors({
          search,
          specialty: spec,
          available: filters.available,
          minRating: filters.minRating
        });
        
        // Fetch clinics with filters
        const clinicsData = await apiService.getClinics({
          search,
          specialty: spec
        });
        
        setDoctors(doctorsData);
        setClinics(clinicsData);
      } catch (error) {
        console.error('Qidiruv natijalarini yuklashda xatolik:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [searchParams, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {searchTerm ? `"${searchTerm}" uchun qidiruv natijalari` : 'Sog\'liqni saqlash xizmatlarini ko\'rish'}
        </h1>
        {specialty && (
          <p className="text-gray-600">Ixtisoslik: {specialty}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <SearchFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        {/* Results */}
        <div className="w-full md:w-3/4">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'doctors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('doctors')}
            >
              Shifokorlar ({doctors.length})
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'clinics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('clinics')}
            >
              Klinikalar ({clinics.length})
            </button>
          </div>

          {/* Results Grid */}
          <div className="space-y-6">
            {activeTab === 'doctors' ? (
              doctors.length > 0 ? (
                doctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Sizning mezonlaringizga mos keladigan shifokorlar topilmadi.</p>
                </div>
              )
            ) : (
              clinics.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {clinics.map(clinic => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Sizning mezonlaringizga mos keladigan klinikalar topilmadi.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
