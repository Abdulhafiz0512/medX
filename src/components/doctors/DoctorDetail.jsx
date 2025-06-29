import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/ApiService';
import { 
  Star, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Award, 
  Briefcase, 
  Heart,
  MessageSquare,
  CheckCircle,
  X,
  Clock as ClockIcon,
  Building2
} from 'lucide-react';
import { Button } from '../ui/Button';
import AppointmentModal from '../appointments/AppointmentModal';
import ReviewList from '../reviews/ReviewList';

const DoctorDetail = ({ doctorId }) => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('services');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock availability data - in a real app, this would come from the API
  const [availability, setAvailability] = useState({
    '2025-07-01': ['09:00', '10:00', '11:00', '14:00', '15:00'],
    '2025-07-02': ['10:00', '11:00', '13:00', '14:00'],
    '2025-07-03': ['09:00', '10:30', '11:30', '15:00', '16:00']
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        // Use the API service to get doctor data by ID
        const foundDoctor = await apiService.getDoctorById(doctorId);
        
        if (foundDoctor) {
          // Enhance the doctor data with additional fields for the detail view
          const enhancedDoctor = {
            ...foundDoctor,
            education: foundDoctor.education || 'MD, Tibbiyot maktabi',
            about: foundDoctor.about || 'Sifatli sog\'liqni saqlash xizmatini taqdim etishga bag\'ishlangan tajribali tibbiyot mutaxassisi.',
            clinic: 'Shahar Tibbiyot Markazi', // This would come from the API in a real app
            address: '123 Tibbiyot yo\'li, Sog\'liq shahri, SS 12345',
            phone: '+998 71 123-45-67',
            email: `${foundDoctor.name.toLowerCase().replace(' ', '.')}@shahartibbiyot.uz`,
            specialties: foundDoctor.specialties || [foundDoctor.specialty],
            educationHistory: [
              { degree: 'MD', institution: 'Tibbiyot maktabi', year: '2010' },
              { degree: 'Residentura', institution: 'Umumiy kasalxona', year: '2013' },
              { degree: 'Fellowship', institution: 'Ixtisoslik klinikasi', year: '2016' }
            ],
            // Keep the original services structure from mock data
            services: foundDoctor.services || [
              { name: 'Maslahat', price: 150000 },
              { name: 'Tashxis', price: 200000 },
              { name: 'Davolash', price: 300000 },
              { name: 'Keyingi parvarish', price: 100000 }
            ],
            reviews: [
              {
                id: 1,
                userName: 'Aziz K.',
                rating: 5,
                comment: 'Dr. Karimova ajoyib! U hamma narsani aniq tushuntirdi va men juda qulay his qildim.',
                date: '2025-05-15',
                verified: true
              },
              {
                id: 2,
                userName: 'Malika G.',
                rating: 4,
                comment: 'Juda professional va bilimdon. Kutish vaqti biroz uzoq edi, lekin arziydi.',
                date: '2025-04-22',
                verified: true
              }
            ]
          };
          setDoctor(enhancedDoctor);
        } else {
          setDoctor(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleReviewSubmit = async (data) => {
    const newReview = {
      id: Date.now(),
      userName: 'Siz',
      date: new Date().toISOString().split('T')[0],
      verified: true,
      ...data,
    };
    setDoctor(prev => ({
      ...prev,
      reviews: [newReview, ...prev.reviews],
      reviewCount: (prev.reviewCount || 0) + 1,
      rating: (((prev.rating || 0) * (prev.reviewCount || 0)) + data.rating) / ((prev.reviewCount || 0) + 1)
    }));
    return { success: true };
  };

  const handleBookAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
    setBookingSuccess(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleConfirmAppointment = () => {
    // In a real app, this would make an API call to book the appointment
    setBookingSuccess(true);
    setTimeout(() => {
      setShowAppointmentModal(false);
      setBookingSuccess(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Xatolik: {error}
        </div>
        <Button onClick={() => navigate('/doctors')} className="mt-4">
          Shifokorlarga qaytish
        </Button>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shifokor topilmadi</h2>
        <Button onClick={() => navigate('/doctors')}>
          Shifokorlarga qaytish
        </Button>
      </div>
    );
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/doctors')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Orqaga qaytish"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Shifokor ma'lumotlari</h1>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={handleCloseModal}
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onDateSelect={handleDateSelect}
        onTimeSelect={handleTimeSelect}
        onConfirm={handleConfirmAppointment}
        availability={availability}
        bookingSuccess={bookingSuccess}
      />

      {/* Doctor Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Doctor Image Header */}
          <div className="h-64 bg-gray-100 relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl font-bold text-white mb-2">{doctor.name}</h2>
              <p className="text-white/90 text-lg">{doctor.specialty}</p>
            </div>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50"
              aria-label={isFavorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
            >
              <Heart 
                className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} 
              />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="flex">
                  {renderStars(doctor.rating)}
                  <span className="ml-2 text-gray-600">
                    {doctor.rating?.toFixed(1)} ({doctor.reviews?.length || 0} fikr)
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-1" /> Qo'ng'iroq
                </Button>
                <Button 
                  onClick={handleBookAppointment}
                  size="sm"
                >
                  <Calendar className="w-4 h-4 mr-1" /> Qabul
                </Button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
                <span>{doctor.experience} yillik tajriba</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Award className="h-5 w-5 text-blue-500 mr-2" />
                <span>{doctor.education}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="h-5 w-5 text-blue-500 mr-2" />
                <span>{doctor.clinic}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 text-blue-500 mr-2" />
                <a href={`tel:${doctor.phone?.replace(/\D/g, '')}`} className="hover:underline">
                  {doctor.phone}
                </a>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Dr. {doctor.name.split(' ')[1]} haqida</h3>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ixtisosliklar</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties?.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex overflow-x-auto">
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`px-6 py-4 font-medium ${activeTab === 'services' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Xizmatlar
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Fikrlar ({doctor.reviews?.length || 0})
                </button>
                <button 
                  onClick={() => setActiveTab('location')}
                  className={`px-6 py-4 font-medium ${activeTab === 'location' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Manzil
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Taqdim etiladigan xizmatlar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.services?.map((service, index) => (
                      <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="flex-1">
                          <span className="text-gray-700 font-medium">{service.name}</span>
                          <div className="text-sm text-gray-500 mt-1">{service.price} so'm</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Bemor fikrlari</h3>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(doctor.rating)}
                      </div>
                      <span className="text-gray-600">{doctor.rating?.toFixed(1)} 5 dan</span>
                    </div>
                  </div>
                  <ReviewList 
                    reviews={doctor.reviews || []} 
                    onReviewSubmit={handleReviewSubmit} 
                  />
                </div>
              )}

              {/* Location Tab */}
              {activeTab === 'location' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Manzil va aloqa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-gray-100 rounded-lg h-64 mb-4 overflow-hidden">
                        {/* Map placeholder - in a real app, you'd use a map component */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <MapPin className="h-12 w-12 text-gray-400" />
                          <span className="ml-2 text-gray-500">Xarita ko'rinishi</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{doctor.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-500 mr-2" />
                          <a href={`tel:${doctor.phone?.replace(/\D/g, '')}`} className="text-blue-600 hover:underline">
                            {doctor.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-500 mr-2" />
                          <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline">
                            {doctor.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Kabinet vaqti</h4>
                      <div className="space-y-3">
                        {doctor.schedule && Object.entries(doctor.schedule).map(([day, hours]) => (
                          <div key={day} className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">
                              {day === 'monday' ? 'Dushanba' :
                               day === 'tuesday' ? 'Seshanba' :
                               day === 'wednesday' ? 'Chorshanba' :
                               day === 'thursday' ? 'Payshanba' :
                               day === 'friday' ? 'Juma' :
                               day === 'saturday' ? 'Shanba' :
                               day === 'sunday' ? 'Yakshanba' : day}
                            </span>
                            <span className="text-gray-900 font-medium">{hours || 'Yopiq'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
