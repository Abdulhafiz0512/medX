// Mock API service for development when backend is unavailable
class MockApiService {
  constructor() {
    this.token = null;
    this.mockUsers = [
      {
        id: 1,
        email: 'admin@example.com',
        name: 'Administrator',
        role: 'admin',
        token: 'mock-jwt-token-admin-123'
      },
      {
        id: 2,
        email: 'doctor@example.com',
        name: 'Dr. Sarvinoz Karimova',
        role: 'doctor',
        token: 'mock-jwt-token-doctor-123'
      },
      {
        id: 3,
        email: 'patient@example.com',
        name: 'Aziz Karimov',
        role: 'patient',
        token: 'mock-jwt-token-patient-123'
      }
    ];

    this.mockClinics = [
      {
        id: 1,
        name: 'Shahar Tibbiyot Markazi',
        address: '123 Sog\'liq ko\'chasi, Toshkent, 100000',
        phone: '+998 71 123-45-67',
        email: 'info@shahartibbiyot.uz',
        description: 'To\'liq xizmat ko\'rsatadigan tibbiy markaz bo\'lib, keng qamrovli sog\'liqni saqlash xizmatlarini taqdim etadi.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        reviewCount: 428,
        specialties: ['Kardiologiya', 'Nevrologiya', 'Dermatologiya', 'Pediatriya'],
        hours: {
          monday: '08:00 - 20:00',
          tuesday: '08:00 - 20:00',
          wednesday: '08:00 - 18:00',
          thursday: '08:00 - 20:00',
          friday: '08:00 - 17:00',
          saturday: '09:00 - 15:00',
          sunday: 'Yopiq'
        },
        facilities: ['Avtomobil to\'xtash joyi', 'G\'ilamli aravacha', 'Dorixona', 'Laboratoriya xizmatlari'],
        insurance: ['O\'zbekiston Respublikasi Tibbiy Sug\'urta', 'Xalqaro sug\'urta']
      },
      {
        id: 2,
        name: 'Markaziy Klinika',
        address: '456 Eski shahar ko\'chasi, Toshkent, 100001',
        phone: '+998 71 987-65-43',
        email: 'aloqa@markaziyklinika.uz',
        description: 'Mutaxassis tibbiy xodimlar bilan ixtisoslashgan klinika.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.4,
        reviewCount: 312,
        specialties: ['Pediatriya', 'Oilaviy tibbiyot', 'Ichki kasalliklar'],
        hours: {
          monday: '09:00 - 19:00',
          tuesday: '09:00 - 19:00',
          wednesday: '09:00 - 17:00',
          thursday: '09:00 - 19:00',
          friday: '09:00 - 16:00',
          saturday: '10:00 - 14:00',
          sunday: 'Yopiq'
        },
        facilities: ['Avtomobil to\'xtash joyi', 'G\'ilamli aravacha', 'Dorixona'],
        insurance: ['O\'zbekiston Respublikasi Tibbiy Sug\'urta', 'Xalqaro sug\'urta']
      },
      {
        id: 3,
        name: 'Quyosh Sog\'liq Klinikasi',
        address: '789 Yangi yo\'l ko\'chasi, Toshkent, 100002',
        phone: '+998 71 456-78-90',
        email: 'salom@quyoshsogliq.uz',
        description: 'Zamonaviy sog\'liqni saqlash muassasasi bo\'lib, sog\'lomlik va oldini olish parvarishiga qaratilgan.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviewCount: 245,
        specialties: ['Dermatologiya', 'Umumiy tibbiyot', 'Sog\'lomlik', 'Ovqatlanish'],
        hours: {
          monday: '08:00 - 18:00',
          tuesday: '08:00 - 18:00',
          wednesday: '08:00 - 18:00',
          thursday: '08:00 - 18:00',
          friday: '08:00 - 17:00',
          saturday: '09:00 - 14:00',
          sunday: 'Yopiq'
        },
        facilities: ['Avtomobil to\'xtash joyi', 'G\'ilamli aravacha', 'Sog\'lomlik markazi', 'Ovqatlanish mutaxassisi'],
        insurance: ['O\'zbekiston Respublikasi Tibbiy Sug\'urta', 'Xalqaro sug\'urta']
      }
    ];

    this.mockDoctors = [
      {
        id: 1,
        name: 'Dr. Sarvinoz Karimova',
        specialty: 'Kardiolog',
        specialties: ['Yurak kasalliklari', 'Gipertoniya', 'Aritmiya'],
        clinicId: 1,
        available: true,
        rating: 4.8,
        reviewCount: 128,
        experience: 12,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        about: '12 yillik tajribaga ega bo\'lgan yurak kasalliklarini davolash bo\'yicha sertifikatlangan kardiolog.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Maslahat', price: 150000 },
          { name: 'EKG', price: 200000 },
          { name: 'Ekokardiografiya', price: 350000 }
        ],
        schedule: {
          monday: '09:00 - 17:00',
          tuesday: '09:00 - 17:00',
          wednesday: '09:00 - 13:00',
          thursday: '09:00 - 17:00',
          friday: '09:00 - 15:00',
          saturday: 'Yopiq',
          sunday: 'Yopiq'
        }
      },
      {
        id: 2,
        name: 'Dr. Aziz Toshmatov',
        specialty: 'Nevrolog',
        specialties: ['Migren', 'Epilepsiya', 'Parkinson kasalligi'],
        clinicId: 1,
        available: true,
        rating: 4.9,
        reviewCount: 215,
        experience: 8,
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        about: 'Harakat buzilishlari va surunkali og\'riqni boshqarishga qaratilgan nevrologiya mutaxassisi.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Maslahat', price: 180000 },
          { name: 'EEG', price: 250000 },
          { name: 'EMG', price: 300000 }
        ],
        schedule: {
          monday: '10:00 - 18:00',
          tuesday: '10:00 - 18:00',
          wednesday: '10:00 - 18:00',
          thursday: '10:00 - 18:00',
          friday: '10:00 - 16:00',
          saturday: '09:00 - 13:00',
          sunday: 'Yopiq'
        }
      },
      {
        id: 3,
        name: 'Dr. Malika Rahimova',
        specialty: 'Pediatr',
        specialties: ['Bolalar emlashlari', 'Sog\'lom bola ko\'rigi', 'Pediatrik parvarish'],
        clinicId: 2,
        available: false,
        rating: 4.7,
        reviewCount: 176,
        experience: 10,
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        about: 'Bolalar sog\'liqni saqlash ehtiyojlariga nozik yondashuv bilan pediatriya mutaxassisi.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Sog\'lom bola ko\'rigi', price: 120000 },
          { name: 'Emlash', price: 80000 },
          { name: 'Kasallik ko\'rigi', price: 150000 }
        ],
        schedule: {
          monday: '08:00 - 16:00',
          tuesday: '08:00 - 16:00',
          wednesday: '08:00 - 12:00',
          thursday: '08:00 - 16:00',
          friday: '08:00 - 14:00',
          saturday: '09:00 - 13:00',
          sunday: 'Yopiq'
        }
      },
      {
        id: 4,
        name: 'Dr. Jamshid Karimov',
        specialty: 'Dermatolog',
        specialties: ['Ter saratoni', 'Akne', 'Psoriaz'],
        clinicId: 1,
        available: true,
        rating: 4.6,
        reviewCount: 94,
        experience: 15,
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        about: 'Ter saratoni aniqlash va davolash bo\'yicha ixtisoslashgan tajribali dermatolog.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Ter ko\'rigi', price: 120000 },
          { name: 'Molekulalar ko\'rigi', price: 200000 },
          { name: 'Ter biopsiyasi', price: 300000 }
        ],
        schedule: {
          monday: '09:00 - 17:00',
          tuesday: '09:00 - 17:00',
          wednesday: '09:00 - 13:00',
          thursday: '09:00 - 17:00',
          friday: '09:00 - 15:00',
          saturday: 'Yopiq',
          sunday: 'Yopiq'
        }
      },
      {
        id: 5,
        name: 'Dr. Feruza Yusupova',
        specialty: 'Endokrinolog',
        specialties: ['Qandli diabet', 'Shchitovid bezi', 'Metabolik buzilishlar'],
        clinicId: 2,
        available: true,
        rating: 4.5,
        reviewCount: 87,
        experience: 11,
        image: 'https://randomuser.me/api/portraits/women/23.jpg',
        about: 'Qandli diabet va boshqa endokrin kasalliklarni davolash bo\'yicha mutaxassis.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Maslahat', price: 160000 },
          { name: 'Qon tahlili', price: 80000 },
          { name: 'Insulin terapiyasi', price: 120000 }
        ],
        schedule: {
          monday: '08:00 - 16:00',
          tuesday: '08:00 - 16:00',
          wednesday: '08:00 - 12:00',
          thursday: '08:00 - 16:00',
          friday: '08:00 - 14:00',
          saturday: 'Yopiq',
          sunday: 'Yopiq'
        }
      },
      {
        id: 6,
        name: 'Dr. Rustam Alimov',
        specialty: 'Ortoped',
        specialties: ['Jarohatlar', 'Artrit', 'Orqa og\'riqlari'],
        clinicId: 3,
        available: true,
        rating: 4.7,
        reviewCount: 156,
        experience: 14,
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
        about: 'Jarohatlar va ortopedik muammolarni davolash bo\'yicha tajribali mutaxassis.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Maslahat', price: 140000 },
          { name: 'Rentgen', price: 60000 },
          { name: 'Fizioterapiya', price: 100000 }
        ],
        schedule: {
          monday: '09:00 - 17:00',
          tuesday: '09:00 - 17:00',
          wednesday: '09:00 - 13:00',
          thursday: '09:00 - 17:00',
          friday: '09:00 - 15:00',
          saturday: 'Yopiq',
          sunday: 'Yopiq'
        }
      },
      {
        id: 7,
        name: 'Dr. Dilfuza Tursunova',
        specialty: 'Ginekolog',
        specialties: ['Ayollar sog\'lig\'i', 'Homiladorlik', 'Menopauza'],
        clinicId: 2,
        available: true,
        rating: 4.8,
        reviewCount: 203,
        experience: 13,
        image: 'https://randomuser.me/api/portraits/women/89.jpg',
        about: 'Ayollar sog\'lig\'i va reproduktiv salomatlik bo\'yicha yuqori malakali mutaxassis.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Maslahat', price: 170000 },
          { name: 'Ultratovush', price: 150000 },
          { name: 'Homiladorlik ko\'rigi', price: 200000 }
        ],
        schedule: {
          monday: '08:00 - 16:00',
          tuesday: '08:00 - 16:00',
          wednesday: '08:00 - 12:00',
          thursday: '08:00 - 16:00',
          friday: '08:00 - 14:00',
          saturday: 'Yopiq',
          sunday: 'Yopiq'
        }
      },
      {
        id: 8,
        name: 'Dr. Shavkat Omonov',
        specialty: 'Oftalmolog',
        specialties: ['Ko\'rish muammolari', 'Katarakta', 'Glaukoma'],
        clinicId: 3,
        available: false,
        rating: 4.6,
        reviewCount: 134,
        experience: 16,
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        about: 'Ko\'rish muammolari va ko\'z kasalliklarini davolash bo\'yicha tajribali oftalmolog.',
        education: 'MD, Toshkent Tibbiyot Akademiyasi',
        services: [
          { name: 'Ko\'z ko\'rigi', price: 100000 },
          { name: 'Ko\'rish tekshiruvi', price: 80000 },
          { name: 'Lazer jarrohligi', price: 500000 }
        ],
        schedule: {
          monday: '09:00 - 17:00',
          tuesday: '09:00 - 17:00',
          wednesday: '09:00 - 13:00',
          thursday: '09:00 - 17:00',
          friday: '09:00 - 15:00',
          saturday: 'Yopiq',
          sunday: 'Yopiq'
        }
      }
    ];
  }

  // Simulate network delay
  _simulateNetwork() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 200));
  }

  setToken(token) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  // Auth methods
  async login(credentials) {
    await this._simulateNetwork();
    // For demo purposes, accept any password
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    this.setToken(user.token);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: user.token
    };
  }

  async register(userData) {
    await this._simulateNetwork();
    const newUser = {
      id: this.mockUsers.length + 1,
      ...userData,
      role: 'patient',
      token: `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`
    };
    this.mockUsers.push(newUser);
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      token: newUser.token
    };
  }

  // Clinic methods
  async getClinics(filters = {}) {
    await this._simulateNetwork();
    let clinics = [...this.mockClinics];

    if (filters.specialty) {
      const spec = filters.specialty.toLowerCase();
      clinics = clinics.filter(clinic =>
        clinic.specialties?.some(s => s.toLowerCase().includes(spec))
      );
    }

    if (filters.search) {
      const term = filters.search.toLowerCase();
      clinics = clinics.filter(clinic =>
        clinic.name.toLowerCase().includes(term) ||
        clinic.address?.toLowerCase().includes(term)
      );
    }

    return clinics;
  }
 
  async createClinic(userId, clinicData) {
    await this._simulateNetwork();
    const newClinic = {
      id: this.mockClinics.length + 1,
      userId,
      rating: 0,
      reviewCount: 0,
      ...clinicData
    };
    this.mockClinics.push(newClinic);
    return newClinic;
  }

  // Doctor methods
  async getDoctors(filters = {}) {
    await this._simulateNetwork();
    let doctors = [...this.mockDoctors];
    
    // Apply filters
    if (filters.specialty) {
      doctors = doctors.filter(doctor => 
        doctor.specialty.toLowerCase() === filters.specialty.toLowerCase() ||
        (doctor.specialties && doctor.specialties.some(s => 
          s.toLowerCase().includes(filters.specialty.toLowerCase())
        ))
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      doctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm) ||
        (doctor.specialties && doctor.specialties.some(s => 
          s.toLowerCase().includes(searchTerm)
        ))
      );
    }
    
    if (filters.available) {
      doctors = doctors.filter(doctor => doctor.available);
    }
    
    return doctors;
  }
  
  async getDoctorById(id) {
    await this._simulateNetwork();
    const doctor = this.mockDoctors.find(d => d.id === parseInt(id));
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }

  async createDoctor(doctorData) {
    await this._simulateNetwork();
    const newDoctor = {
      id: Math.max(...this.mockDoctors.map(d => d.id)) + 1,
      ...doctorData,
      rating: 0,
      reviewCount: 0,
      available: true
    };
    this.mockDoctors.push(newDoctor);
    return newDoctor;
  }
}

export const apiService = new MockApiService();
export default apiService;
