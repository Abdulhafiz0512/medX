import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Stethoscope, Building2, Calendar, Clock, Heart, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '../components/ui';

const healthPosts = [
  {
    id: 1,
    title: "Yurak sog'lig'i uchun 5 maslahat",
    excerpt: "Oddiy hayot tarzi o'zgarishlari bilan yurak sog'lig'ingizni qanday saqlashni o'rganing...",
    category: 'Kardiologiya',
    date: '27 Iyun, 2025',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Qandli diabetni boshqarishni tushunish',
    excerpt: "Ovqatlanish va mashqlar orqali diabetni boshqarish bo'yicha keng qamrovli qo'llanma...",
    category: 'Endokrinologiya',
    date: '25 Iyun, 2025',
    image: 'data:image/jpeg;base64,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'
  }
];

const topClinics = [
  {
    id: 1,
    name: 'Shahar Tibbiyot Markazi',
    rating: 4.8,
    reviews: 124,
    specialties: ['Kardiologiya', 'Nevrologiya', 'Pediatriya'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: "Quyosh Sog'liq Klinikasi",
    rating: 4.6,
    reviews: 98,
    specialties: ['Dermatologiya', 'Umumiy tibbiyot'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const topDoctors = [
  {
    id: 1,
    name: 'Dr. Sarvinoz Karimova',
    specialty: 'Kardiolog',
    rating: 4.9,
    reviews: 45,
    clinic: 'Shahar Tibbiyot Markazi',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Dr. Aziz Toshmatov',
    specialty: 'Nevrolog',
    rating: 4.8,
    reviews: 32,
    clinic: "G'amxo'rlik Markazi",
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
];

const quickActions = [
  {
    id: 'find-clinic',
    title: 'Klinika topish',
    description: 'Yaqin atrofingizdagi klinikalarni qidiring',
    icon: Building2,
    path: '/clinics',
    color: 'bg-blue-500'
  },
  {
    id: 'find-doctor',
    title: 'Shifokor topish',
    description: "To'g'ri mutaxassisni toping",
    icon: Stethoscope,
    path: '/doctors',
    color: 'bg-green-500'
  },
  {
    id: 'book-appointment',
    title: 'Uchrashuv bron qilish',
    description: 'Tashrifingizni rejalashtiring',
    icon: Calendar,
    path: '/clinics',
    color: 'bg-purple-500'
  },
  {
    id: 'health-tips',
    title: "Sog'liq maslahatlari",
    description: "Sog'lom bo'ling va ma'lumotli bo'ling",
    icon: Heart,
    path: '#',
    color: 'bg-red-500'
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/clinics?q=${searchQuery}`);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="text-blue-600">Med</span>
          <span className="text-green-600">X</span> platformasiga xush kelibsiz
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Eng yaxshi sog'liqni saqlash xizmatlarini toping va keng qamrovli platformamiz bilan sog'lom bo'ling.
        </p>
        
        {/* Quick Search */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Klinikalar yoki shifokorlarni qidiring..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="px-6">
            Qidirish
          </Button>
        </form>
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tezkor harakatlar</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Clinics */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Tavsiya etilgan klinikalar</h2>
          <Button variant="ghost" onClick={() => navigate('/clinics')} className="text-blue-600 hover:bg-blue-50">
            Hammasini ko'rish
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topClinics.map(clinic => (
            <div key={clinic.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/clinics/${clinic.id}`)}>
              <img 
                src={clinic.image} 
                alt={clinic.name} 
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{clinic.name}</h3>
                <div className="flex items-center mb-2">
                  {renderStars(clinic.rating)}
                  <span className="text-sm text-gray-600 ml-2">({clinic.reviews})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {clinic.specialties.slice(0, 2).map(specialty => (
                    <span key={specialty} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Eng yaxshi shifokorlar</h2>
          <Button variant="ghost" onClick={() => navigate('/doctors')} className="text-blue-600 hover:bg-blue-50">
            Hammasini ko'rish
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/doctors/${doctor.id}`)}>
              <div className="flex items-center space-x-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500 mb-2">{doctor.clinic}</p>
                  <div className="flex items-center">
                    {renderStars(doctor.rating)}
                    <span className="text-sm text-gray-600 ml-2">({doctor.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sog'liq maslahatlari</h2>
        <div className="space-y-4">
          {healthPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{post.title}</h3>
                  <p className="text-xs text-gray-600">{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-red-50 rounded-xl p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">Shoshilinch yordam</h2>
          <p className="text-red-600 mb-4">Agar siz yoki yaqinlaringiz shoshilinch tibbiy yordamga muhtoj bo'lsangiz</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Phone className="w-4 h-4 mr-2" />
            103 ga qo'ng'iroq qiling
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
