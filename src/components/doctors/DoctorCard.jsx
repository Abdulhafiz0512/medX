import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Award, DollarSign, Building2 } from 'lucide-react';
import { apiService } from '../../services/ApiService';

const DoctorCard = ({ doctor, onSelect }) => {
  const [clinic, setClinic] = useState(null);

  useEffect(() => {
    const fetchClinic = async () => {
      if (doctor.clinicId) {
        try {
          const clinics = await apiService.getClinics();
          const foundClinic = clinics.find(c => c.id === doctor.clinicId);
          setClinic(foundClinic);
        } catch (error) {
          console.error('Error fetching clinic:', error);
        }
      }
    };

    fetchClinic();
  }, [doctor.clinicId]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(doctor);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="w-full md:w-32 flex-shrink-0">
            <div className="relative pb-4/5 h-40 md:h-32 rounded-lg overflow-hidden">
              <img
                src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`}
                alt={doctor.name}
                className="absolute h-full w-full object-cover"
              />
              {!doctor.available && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Mavjud emas
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {renderStars(doctor.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({doctor.reviewCount || 0})
                    </span>
                  </div>
                </div>

                {clinic && (
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{clinic.name}</span>
                  </div>
                )}

                {doctor.experience && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-1 text-gray-400" />
                    <span>{doctor.experience} yillik tajriba</span>
                  </div>
                )}

                {doctor.specialties && doctor.specialties.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-700 mb-1">Ixtisosliklar:</div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specialties.slice(0, 3).map((specialty, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {doctor.specialties.length > 3 && (
                        <span className="text-xs text-gray-500">+{doctor.specialties.length - 3} yana</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" />
                  <span>{doctor.available ? 'Bugun mavjud' : 'Bugun mavjud emas'}</span>
                </div>
                
                {doctor.services && doctor.services.length > 0 && (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                    <span className="font-semibold text-gray-900">
                      ${doctor.services[0]?.price || 'N/A'}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">maslahat</span>
                  </div>
                )}

                <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium whitespace-nowrap">
                  Profilni ko'rish
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DoctorCard };
export default DoctorCard;
