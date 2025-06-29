import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Star, Phone, Mail, Calendar, Building2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { apiService } from '../../services/ApiService';

const ClinicDetail = ({ clinicId }) => {
  const [clinic, setClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clinicsData, doctorsData] = await Promise.all([
          apiService.getClinics(),
          apiService.getDoctors()
        ]);
        const foundClinic = clinicsData.find(c => c.id.toString() === clinicId);
        setClinic(foundClinic || null);
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
        setClinic(null);
      } finally {
        setLoading(false);
      }
    };

    if (clinicId) {
      fetchData();
    }
  }, [clinicId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Klinika topilmadi</h2>
        <Button onClick={() => navigate('/clinics')}>
          Klinikalarga qaytish
        </Button>
      </div>
    );
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const getDoctorsForClinic = () => {
    return doctors.filter(doctor => doctor.clinicId === clinic.id);
  };

  const clinicDoctors = getDoctorsForClinic();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/clinics')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Orqaga qaytish"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Klinika ma'lumotlari</h1>
          </div>
        </div>
      </div>

      {/* Clinic Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Clinic Image */}
          <div className="h-64 bg-gray-100 relative">
            <img
              src={clinic.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
              alt={clinic.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-3xl font-bold text-white mb-2">{clinic.name}</h1>
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{clinic.address}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="flex">
                  {renderStars(clinic.rating || 0)}
                  <span className="ml-2 text-gray-600">
                    {clinic.rating?.toFixed(1)} ({clinic.reviewCount || 0} fikr)
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-1" /> Qo'ng'iroq
                </Button>
                <Button size="sm">
                  <Calendar className="w-4 h-4 mr-1" /> Uchrashuv bron qilish
                </Button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center text-gray-600">
                <Building2 className="h-5 w-5 text-blue-500 mr-2" />
                <span>{clinic.specialties?.length || 0} Ixtisoslik</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span>{clinicDoctors.length} Shifokor</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span>Bugun ochiq</span>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Haqida</h2>
              <p className="text-gray-600 leading-relaxed">{clinic.description || 'Tavsif mavjud emas.'}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Working Hours */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ish vaqti</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {clinic.hours ? (
                      Object.entries(clinic.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center">
                          <span className="text-gray-700 capitalize font-medium">
                            {day === 'monday' ? 'Dushanba' :
                             day === 'tuesday' ? 'Seshanba' :
                             day === 'wednesday' ? 'Chorshanba' :
                             day === 'thursday' ? 'Payshanba' :
                             day === 'friday' ? 'Juma' :
                             day === 'saturday' ? 'Shanba' :
                             day === 'sunday' ? 'Yakshanba' : day}
                          </span>
                          <span className="text-gray-600">{hours || 'Yopiq'}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Ish vaqti mavjud emas</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Specialties & Facilities */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ixtisosliklar</h3>
                  <div className="flex flex-wrap gap-2">
                    {clinic.specialties && clinic.specialties.length > 0 ? (
                      clinic.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Ixtisosliklar ro'yxatlanmagan</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Imkoniyatlar</h3>
                  <div className="space-y-2">
                    {clinic.facilities && clinic.facilities.length > 0 ? (
                      clinic.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">{facility}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Imkoniyatlar ro'yxatlanmagan</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctors Section */}
            {clinicDoctors.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Bu klinikadagi shifokorlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinicDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center mb-3">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {renderStars(doctor.rating)}
                          <span className="text-sm text-gray-600 ml-1">({doctor.reviewCount})</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doctor.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.available ? 'Mavjud' : 'Mavjud emas'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aloqa ma'lumotlari</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <a href={`tel:${clinic.phone?.replace(/\D/g, '')}`} className="hover:text-blue-600">
                    {clinic.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <a href={`mailto:${clinic.email}`} className="hover:text-blue-600">
                    {clinic.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetail;
