import React, { useContext, useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Settings, 
  LogOut, 
  Edit, 
  Camera,
  Shield,
  Bell,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Card, CardContent, Button } from '../ui';
import { AppContext } from '../../context/AppContext';

const ProfilePage = () => {
  const { user } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Comprehensive fake user data in Uzbek
  const profileData = {
    personal: {
      fullName: user?.username || 'Aziz Karimov',
      email: user?.email || 'aziz.karimov@example.com',
      phone: '+998 90 123-45-67',
      dateOfBirth: '15 Mart, 1985',
      gender: 'Erkak',
      address: "123 Sog'liq ko'chasi, Tibbiyot shahri, TS 12345",
      emergencyContact: {
        name: 'Malika Karimova',
        relationship: 'Xotini',
        phone: '+998 90 987-65-43'
      }
    },
    medical: {
      bloodType: 'O+',
      height: '175 sm',
      weight: '75 kg',
      allergies: ['Penitsillin', "Yong'oq"],
      conditions: ['Gipertoniya (Nazorat ostida)', 'Mavsumiy allergiya'],
      medications: [
        { name: 'Lizinopril', dosage: '10mg kunlik', prescribedBy: 'Dr. Toshmatov' },
        { name: 'Setirizin', dosage: "10mg kerak bo'lganda", prescribedBy: 'Dr. Karimova' }
      ],
      immunizations: [
        { name: 'COVID-19', date: '2023-12-15', nextDue: '2024-12-15' },
        { name: 'Gripp', date: '2023-10-20', nextDue: '2024-10-20' },
        { name: 'Stolbnyak', date: '2022-05-10', nextDue: '2027-05-10' }
      ]
    },
    appointments: [
      {
        id: 1,
        doctor: 'Dr. Sarvinoz Karimova',
        specialty: 'Kardiologiya',
        date: '2024-01-15',
        time: '10:00',
        status: 'upcoming',
        clinic: 'Shahar Tibbiyot Markazi'
      },
      {
        id: 2,
        doctor: 'Dr. Aziz Toshmatov',
        specialty: 'Dermatologiya',
        date: '2024-01-20',
        time: '14:30',
        status: 'upcoming',
        clinic: 'Terini Parvarish Qilish Klinikasi'
      },
      {
        id: 3,
        doctor: 'Dr. Malika Rahimova',
        specialty: 'Umumiy tibbiyot',
        date: '2023-12-10',
        time: '09:00',
        status: 'completed',
        clinic: 'Shahar Tibbiyot Markazi'
      }
    ],
    insurance: {
      provider: "O'zbekiston Respublikasi Tibbiy Sug'urta",
      policyNumber: 'OST123456789',
      groupNumber: 'GRP987654321',
      effectiveDate: '2024-01-01',
      expiryDate: '2024-12-31',
      copay: '25,000 so\'m',
      deductible: '1,500,000 so\'m'
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Chiqish...');
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
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Profil</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Profile Header */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="relative self-center sm:self-start">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  {profileData.personal.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute -bottom-1 -right-1 bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50">
                  <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{profileData.personal.fullName}</h2>
                <p className="text-gray-600 mb-2">{user?.role || 'Bemor'}</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-500">
                  <div className="flex items-center justify-center sm:justify-start">
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="truncate">{profileData.personal.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Phone className="h-4 w-4 mr-1" />
                    <span>{profileData.personal.phone}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="self-center sm:self-start">
                <Edit className="h-4 w-4 mr-2" />
                Profilni tahrirlash
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs - Mobile Optimized */}
        <div className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'personal', label: 'Shaxsiy', icon: User },
              { id: 'medical', label: 'Tibbiy', icon: Heart },
              { id: 'appointments', label: 'Uchrashuvlar', icon: Calendar },
              { id: 'insurance', label: 'Sug\'urta', icon: Shield },
              { id: 'settings', label: 'Sozlamalar', icon: Settings }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center px-3 py-3 text-sm font-medium transition-colors min-w-0 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Asosiy ma'lumotlar</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">To'liq ism</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.personal.fullName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Tug'ilgan sana</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.personal.dateOfBirth}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Jinsi</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.personal.gender}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Elektron pochta</span>
                      <span className="font-medium text-sm sm:text-base break-all">{profileData.personal.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Telefon</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.personal.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Manzil va shoshilinch aloqa</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-600 block mb-1 text-sm sm:text-base">Manzil</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.personal.address}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Shoshilinch aloqa</h4>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="text-gray-600 text-sm sm:text-base">Ism</span>
                          <span className="font-medium text-sm sm:text-base">{profileData.personal.emergencyContact.name}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="text-gray-600 text-sm sm:text-base">Munosabat</span>
                          <span className="font-medium text-sm sm:text-base">{profileData.personal.emergencyContact.relationship}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <span className="text-gray-600 text-sm sm:text-base">Telefon</span>
                          <span className="font-medium text-sm sm:text-base">{profileData.personal.emergencyContact.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Medical Information */}
          {activeTab === 'medical' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hayotiy ma'lumotlar</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Qon guruhi</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.medical.bloodType}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Balandlik</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.medical.height}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Vazn</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.medical.weight}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Allergiya va kasalliklar</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-600 block mb-2 text-sm sm:text-base">Allergiyalar</span>
                      <div className="flex flex-wrap gap-2">
                        {profileData.medical.allergies.map((allergy, index) => (
                          <span key={index} className="bg-red-100 text-red-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-2 text-sm sm:text-base">Tibbiy holatlar</span>
                      <div className="space-y-2">
                        {profileData.medical.conditions.map((condition, index) => (
                          <div key={index} className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Joriy dorilar</h3>
                  <div className="space-y-3">
                    {profileData.medical.medications.map((med, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <div className="font-medium text-sm sm:text-base">{med.name}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{med.dosage}</div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">Tavsiya qilgan: {med.prescribedBy}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emlash tarixi</h3>
                  <div className="space-y-3">
                    {profileData.medical.immunizations.map((immunization, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 rounded-lg space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <div className="font-medium text-sm sm:text-base">{immunization.name}</div>
                          <div className="text-xs sm:text-sm text-gray-600">Olingan: {immunization.date}</div>
                        </div>
                        <div className="text-xs sm:text-sm text-green-600">Keyingi muddat: {immunization.nextDue}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appointments */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <h3 className="text-lg font-semibold text-gray-900">Uchrashuvlar</h3>
                <Button size="sm" className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Yangi uchrashuv bron qilish
                </Button>
              </div>

              <div className="space-y-3">
                {profileData.appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{appointment.doctor}</h4>
                          <p className="text-xs sm:text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-xs text-gray-500">{appointment.clinic}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                          appointment.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {appointment.status === 'upcoming' ? 'Kutilmoqda' : 'Bajarilgan'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                      
                      {appointment.status === 'upcoming' && (
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 text-xs">
                            Qayta rejalashtirish
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-xs">
                            Bekor qilish
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Insurance */}
          {activeTab === 'insurance' && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sug'urta ma'lumotlari</h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Tashkilot</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.insurance.provider}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Polis raqami</span>
                      <span className="font-medium text-sm sm:text-base break-all">{profileData.insurance.policyNumber}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Guruh raqami</span>
                      <span className="font-medium text-sm sm:text-base break-all">{profileData.insurance.groupNumber}</span>
                    </div>
                  </div>
                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Kuchga kirish sanasi</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.insurance.effectiveDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Tugash sanasi</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.insurance.expiryDate}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">To'lov</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.insurance.copay}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="text-gray-600 text-sm sm:text-base">Franchayzing</span>
                      <span className="font-medium text-sm sm:text-base">{profileData.insurance.deductible}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hisob sozlamalari</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm sm:text-base">Bildirishnomalar</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm sm:text-base">Maxfiylik va xavfsizlik</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm sm:text-base">To'lov usullari</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm sm:text-base">Shartlar va sharoitlar</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span className="text-sm sm:text-base">Chiqish</span>
                  </button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export {ProfilePage}