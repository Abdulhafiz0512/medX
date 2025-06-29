# MedX - Healthcare Platform

[English](#english) | [O'zbekcha](#uzbekcha)

---

## English

### 📋 Overview

**MedX** (Healthcare Platform) is a comprehensive healthcare platform built with React that connects patients with healthcare providers in Uzbekistan. The application features a modern, mobile-responsive design with full Uzbek language localization.

### 🚀 Features

#### Core Functionality
- **Patient Portal**: Complete patient management system
- **Clinic Directory**: Browse and search healthcare facilities
- **Doctor Profiles**: Detailed information about healthcare providers
- **Appointment Booking**: Schedule and manage medical appointments
- **Health Records**: Digital medical history and documentation
- **Insurance Integration**: Healthcare insurance management

#### Technical Features
- **100% Uzbek Localization**: Complete translation of all user interfaces
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Mock Data System**: Comprehensive demo data for development
- **Authentication System**: Secure login with role-based access
- **Real-time Search**: Advanced filtering and search capabilities

### 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite
- **Language**: JavaScript/JSX

### 📱 Screenshots

#### Main Features
- **Homepage**: Welcome screen with quick actions and featured content
- **Clinic Directory**: Browse healthcare facilities with detailed information
- **Doctor Profiles**: Comprehensive doctor information and reviews
- **Patient Dashboard**: Personal health records and appointment management
- **Search & Filter**: Advanced search functionality with multiple filters

### 🚀 Getting Started

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

#### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clinic-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

#### Demo Accounts

For testing purposes, you can use these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@example.com | any |
| Doctor | doctor@example.com | any |
| Patient | patient@example.com | any |

### 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── clinics/        # Clinic-related components
│   ├── doctors/        # Doctor-related components
│   ├── layout/         # Layout components
│   ├── profile/        # Profile components
│   └── ui/             # Basic UI components
├── context/            # React Context providers
├── pages/              # Main page components
├── services/           # API and mock services
├── routes/             # Routing configuration
└── main.jsx           # Application entry point
```

### 🔧 Configuration

#### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=MedX
VITE_API_BASE_URL=http://localhost:3000/api
```

#### Customization
- **Colors**: Modify Tailwind CSS configuration in `tailwind.config.js`
- **Language**: Update translations in component files
- **Data**: Modify mock data in `src/services/MockApiService.js`

### 📊 Data Structure

#### Clinic Data
```javascript
{
  id: 1,
  name: "Shahar Tibbiyot Markazi",
  address: "123 Sog'liq ko'chasi, Toshkent",
  phone: "+998 71 123-45-67",
  email: "info@shahartibbiyot.uz",
  specialties: ["Kardiologiya", "Nevrologiya"],
  rating: 4.6,
  reviewCount: 428
}
```

#### Doctor Data
```javascript
{
  id: 1,
  name: "Dr. Sarvinoz Karimova",
  specialty: "Kardiolog",
  clinicId: 1,
  experience: 12,
  rating: 4.8,
  available: true
}
```

### 🎨 UI Components

#### Available Components
- **Button**: Various button styles and sizes
- **Card**: Content containers with different layouts
- **Input**: Form input fields with validation
- **Modal**: Popup dialogs for forms and confirmations
- **Navigation**: Bottom navigation for mobile devices

#### Design System
- **Colors**: Blue primary theme with gray accents
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Icons**: Lucide React icon library

### 🔐 Security Features

- **Role-based Access**: Different permissions for patients, doctors, and administrators
- **Secure Authentication**: JWT token-based authentication
- **Data Validation**: Input validation and sanitization
- **Protected Routes**: Authentication-required pages

### 📱 Mobile Optimization

- **Responsive Design**: Works on all screen sizes
- **Touch-friendly**: Optimized for touch interactions
- **Fast Loading**: Optimized bundle size and lazy loading
- **Offline Support**: Basic offline functionality

### 🧪 Testing

#### Manual Testing
1. Test all user flows (registration, login, booking)
2. Verify mobile responsiveness
3. Check Uzbek language accuracy
4. Test search and filter functionality

#### Automated Testing
```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

### 🚀 Deployment

#### Build for Production
```bash
npm run build
```

#### Deploy Options
- **Vercel**: Connect GitHub repository for automatic deployment
- **Netlify**: Drag and drop build folder
- **Firebase**: Use Firebase Hosting
- **Custom Server**: Deploy to any web server

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

---

## O'zbekcha

### 📋 Umumiy ma'lumot

**MedX** - O'zbekistondagi bemorlarni sog'liqni saqlash xizmatlari bilan bog'laydigan React asosida qurilgan keng qamrovli sog'liqni saqlash platformasi. Ilova zamonaviy, mobil qurilmalarga moslashgan dizayn va to'liq o'zbek tilida joylashtirilgan.

### 🚀 Xususiyatlar

#### Asosiy funksiyalar
- **Bemor portali**: To'liq bemor boshqaruvi tizimi
- **Klinika katalogi**: Sog'liqni saqlash muassasalarini ko'rish va qidirish
- **Shifokor profillari**: Sog'liqni saqlash xizmatlari haqida batafsil ma'lumot
- **Uchrashuv bron qilish**: Tibbiy uchrashuvlarni rejalashtirish va boshqarish
- **Sog'liq yozuvlari**: Raqamli tibbiy tarix va hujjatlar
- **Sug'urta integratsiyasi**: Sog'liqni saqlash sug'urtasi boshqaruvi

#### Texnik xususiyatlar
- **100% o'zbek tilida**: Barcha foydalanuvchi interfeyslarining to'liq tarjimasi
- **Mobil-avval dizayn**: Mobil qurilmalar uchun optimallashtirilgan responsive dizayn
- **Zamonaviy UI/UX**: Tailwind CSS bilan tozalangan, intuitiv interfeys
- **Mock ma'lumotlar tizimi**: Rivojlanish uchun keng qamrovli demo ma'lumotlar
- **Autentifikatsiya tizimi**: Rol asosida kirish bilan xavfsiz tizim
- **Real vaqtda qidiruv**: Kengaytirilgan filtrlash va qidiruv imkoniyatlari

### 🛠️ Texnologiya to'plami

- **Frontend**: React 18, Vite
- **Stillar**: Tailwind CSS
- **Ikonlar**: Lucide React
- **Marshrutlash**: React Router v6
- **Holat boshqaruvi**: React Context API
- **Qurish vositasi**: Vite
- **Til**: JavaScript/JSX

### 📱 Ekran tasvirlari

#### Asosiy xususiyatlar
- **Bosh sahifa**: Tezkor harakatlar va tavsiya etilgan kontent bilan xush kelibsiz ekrani
- **Klinika katalogi**: Batafsil ma'lumotlar bilan sog'liqni saqlash muassasalarini ko'rish
- **Shifokor profillari**: Keng qamrovli shifokor ma'lumotlari va fikrlar
- **Bemor paneli**: Shaxsiy sog'liq yozuvlari va uchrashuv boshqaruvi
- **Qidiruv va filtrlash**: Ko'p filtrlash bilan kengaytirilgan qidiruv funksiyasi

### 🚀 Boshlash

#### Talablar
- Node.js (v16 yoki undan yuqori)
- npm yoki yarn paket menejeri

#### O'rnatish

1. **Repositoryni klonlash**
   ```bash
   git clone <repository-url>
   cd clinic-app
   ```

2. **Bog'liqliklarni o'rnatish**
   ```bash
   npm install
   ```

3. **Rivojlanish serverini ishga tushirish**
   ```bash
   npm run dev
   ```

4. **Brauzerda ochish**
   ```
   http://localhost:5173
   ```

#### Demo hisoblar

Sinab ko'rish uchun quyidagi demo hisoblardan foydalanishingiz mumkin:

| Rol | Email | Parol |
|-----|-------|-------|
| Administrator | admin@example.com | har qanday |
| Shifokor | doctor@example.com | har qanday |
| Bemor | patient@example.com | har qanday |

### 📁 Loyiha tuzilishi

```
src/
├── components/          # Qayta ishlatiladigan UI komponentlari
│   ├── auth/           # Autentifikatsiya komponentlari
│   ├── clinics/        # Klinika bilan bog'liq komponentlar
│   ├── doctors/        # Shifokor bilan bog'liq komponentlar
│   ├── layout/         # Layout komponentlari
│   ├── profile/        # Profil komponentlari
│   └── ui/             # Asosiy UI komponentlari
├── context/            # React Context provayderlari
├── pages/              # Sahifa komponentlari
├── services/           # API va ma'lumotlar xizmatlari
├── routes/             # Marshrutlash konfiguratsiyasi
└── main.jsx           # Ilova kirish nuqtasi
```

### 🔧 Sozlash

#### Muhit o'zgaruvchilari
Root papkada `.env` faylini yarating:

```env
VITE_APP_TITLE=MedX
VITE_API_BASE_URL=http://localhost:3000/api
```

#### Moslashtirish
- **Ranglar**: `tailwind.config.js` faylida Tailwind CSS konfiguratsiyasini o'zgartiring
- **Til**: Komponent fayllaridagi tarjimalarni yangilang
- **Ma'lumotlar**: `src/services/MockApiService.js` faylidagi mock ma'lumotlarni o'zgartiring

### 📊 Ma'lumotlar tuzilishi

#### Klinika ma'lumotlari
```javascript
{
  id: 1,
  name: "Shahar Tibbiyot Markazi",
  address: "123 Sog'liq ko'chasi, Toshkent",
  phone: "+998 71 123-45-67",
  email: "info@shahartibbiyot.uz",
  specialties: ["Kardiologiya", "Nevrologiya"],
  rating: 4.6,
  reviewCount: 428
}
```

#### Shifokor ma'lumotlari
```javascript
{
  id: 1,
  name: "Dr. Sarvinoz Karimova",
  specialty: "Kardiolog",
  clinicId: 1,
  experience: 12,
  rating: 4.8,
  available: true
}
```

### 🎨 UI komponentlari

#### Mavjud komponentlar
- **Button**: Turli xil tugma stillari va o'lchamlari
- **Card**: Turli xil layoutlar bilan kontent konteynerlari
- **Input**: Validatsiya bilan forma kiritish maydonlari
- **Modal**: Formalar va tasdiqlash uchun popup dialoglar
- **Navigation**: Mobil qurilmalar uchun pastki navigatsiya

#### Dizayn tizimi
- **Ranglar**: Kulrang aksentlar bilan ko'k asosiy tema
- **Tipografiya**: Inter shrift oilasi
- **Masofalar**: Izchil 4px grid tizimi
- **Ikonlar**: Lucide React ikon kutubxonasi

### 🔐 Xavfsizlik xususiyatlari

- **Rol asosida kirish**: Bemolar, shifokorlar va administratorlar uchun turli xil ruxsatlar
- **Xavfsiz autentifikatsiya**: JWT token asosida autentifikatsiya
- **Ma'lumotlar validatsiyasi**: Kiritish validatsiyasi va sanitizatsiyasi
- **Himoyalangan marshrutlar**: Autentifikatsiya talab qilinadigan sahifalar

### 📱 Mobil optimizatsiya

- **Responsive dizayn**: Barcha ekran o'lchamlarida ishlaydi
- **Tegishga moslashgan**: Tegish o'zaro ta'siri uchun optimallashtirilgan
- **Tez yuklanish**: Optimallashtirilgan bundle hajmi va lazy loading
- **Offline qo'llab-quvvatlash**: Asosiy offline funksionallik

### 🧪 Testlash

#### Qo'lda testlash
1. Barcha foydalanuvchi oqimlarini sinab ko'ring (ro'yxatdan o'tish, kirish, bron qilish)
2. Mobil responsive dizaynni tekshiring
3. O'zbek tilining aniqligini tekshiring
4. Qidiruv va filtrlash funksiyasini sinab ko'ring

#### Avtomatlashtirilgan testlash
```bash
# Testlarni ishga tushirish (amalga oshirilganda)
npm test

# Coverage bilan testlarni ishga tushirish
npm run test:coverage
```

### 🚀 Joylashtirish

#### Ishlab chiqarish uchun qurish
```bash
npm run build
```

#### Joylashtirish variantlari
- **Vercel**: Avtomatik joylashtirish uchun GitHub repositoryni ulang
- **Netlify**: Build papkasini sudrab tashlang
- **Firebase**: Firebase Hosting-dan foydalaning
- **Maxsus server**: Har qanday web serverga joylashtiring

### 🤝 Hissa qo'shish

1. Repositoryni fork qiling
2. Feature branch yarating (`git checkout -b feature/ajoyib-xususiyat`)
3. O'zgarishlaringizni commit qiling (`git commit -m 'Ajoyib xususiyat qo\'shing'`)
4. Branch-ga push qiling (`git push origin feature/ajoyib-xususiyat`)
5. Pull Request oching

### 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida litsenziyalangan - batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'ring.

### 📞 Qo'llab-quvvatlash

Qo'llab-quvvatlash va savollar uchun:
- GitHub repository-da muammo yarating
- Rivojlanish jamoasi bilan bog'laning
- Hujjatlarni tekshiring

---

## 📝 Changelog

### v1.0.0 (2024-01-15)
- ✅ Initial release
- ✅ Complete Uzbek localization
- ✅ Mobile-responsive design
- ✅ Mock data system
- ✅ Authentication system
- ✅ Clinic and doctor management
- ✅ Appointment booking system
- ✅ Profile management
- ✅ Search and filter functionality

---

## 🤝 Contributors

- **Development Team** - Initial work
- **UI/UX Designers** - Design system
- **Translators** - Uzbek localization

---

*This project is maintained by the MedX development team.*