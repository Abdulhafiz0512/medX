import React from 'react';
import { MapPin, Clock, Star, Phone, Mail } from 'lucide-react';

const ClinicCard = ({ clinic, onSelect }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const getTodayHours = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    const todayKey = days[today];
    return clinic.hours ? clinic.hours[todayKey] : 'Closed';
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(clinic);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      {/* Clinic Image */}
      <div className="h-40 bg-gray-100 relative">
        <img
          src={clinic.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
          alt={clinic.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Clinic Info */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
              {clinic.name}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              <span>{clinic.address}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
            {renderStars(clinic.rating)}
            <span className="ml-1">{clinic.rating}</span>
          </div>
        </div>

        {/* Specialties */}
        {clinic.specialties && clinic.specialties.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Ixtisosliklar:</h4>
            <div className="flex flex-wrap gap-1">
              {clinic.specialties.slice(0, 4).map((specialty, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {specialty}
                </span>
              ))}
              {clinic.specialties.length > 4 && (
                <span className="text-xs text-gray-500">+{clinic.specialties.length - 4} yana</span>
              )}
            </div>
          </div>
        )}

        {/* Facilities */}
        {clinic.facilities && clinic.facilities.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Tashkilotlar:</h4>
            <div className="flex flex-wrap gap-1">
              {clinic.facilities.slice(0, 3).map((facility, index) => (
                <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                  {facility}
                </span>
              ))}
              {clinic.facilities.length > 3 && (
                <span className="text-xs text-gray-500">+{clinic.facilities.length - 3} yana</span>
              )}
            </div>
          </div>
        )}

        {/* Contact & Hours */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <a href={`tel:${clinic.phone}"`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
                  {clinic.phone}
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <a href={`mailto:${clinic.email}`} className="hover:text-blue-600 truncate" onClick={(e) => e.stopPropagation()}>
                  {clinic.email}
                </a>
              </div>
            </div>
            <div>
              <div className="flex items-start text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Bugun: {getTodayHours()}</div>
                  <div className="text-blue-600 text-sm hover:underline">
                    Barcha vaqtlar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            Ma'lumotlarni ko'rish
          </div>
        </div>
      </div>
    </div>
  );
};

export { ClinicCard };
export default ClinicCard;
