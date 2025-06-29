# API Documentation / API Hujjatlari

[English](#english) | [O'zbekcha](#uzbekcha)

---

## English

### Overview

This document describes the API endpoints and data structures used in the MedX healthcare platform. The application currently uses a mock API service for development purposes.

### Base URL

```
Development: http://localhost:5173
Production: https://your-domain.com
```

### Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Authentication

##### POST /auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "patient@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "name": "Aziz Karimov",
    "role": "patient"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "role": "patient"
}
```

#### Clinics

##### GET /clinics
Get list of all clinics with optional filters.

**Query Parameters:**
- `search` (string): Search by clinic name or address
- `specialty` (string): Filter by medical specialty
- `rating` (number): Minimum rating filter

**Response:**
```json
[
  {
    "id": 1,
    "name": "Shahar Tibbiyot Markazi",
    "address": "123 Sog'liq ko'chasi, Toshkent",
    "phone": "+998 71 123-45-67",
    "email": "info@shahartibbiyot.uz",
    "description": "To'liq xizmat ko'rsatadigan tibbiy markaz",
    "image": "https://example.com/clinic1.jpg",
    "rating": 4.6,
    "reviewCount": 428,
    "specialties": ["Kardiologiya", "Nevrologiya"],
    "hours": {
      "monday": "08:00 - 20:00",
      "tuesday": "08:00 - 20:00",
      "wednesday": "08:00 - 18:00"
    },
    "facilities": ["Avtomobil to'xtash joyi", "Dorixona"],
    "insurance": ["O'zbekiston Respublikasi Tibbiy Sug'urta"]
  }
]
```

##### GET /clinics/:id
Get detailed information about a specific clinic.

**Response:**
```json
{
  "id": 1,
  "name": "Shahar Tibbiyot Markazi",
  "address": "123 Sog'liq ko'chasi, Toshkent",
  "phone": "+998 71 123-45-67",
  "email": "info@shahartibbiyot.uz",
  "description": "To'liq xizmat ko'rsatadigan tibbiy markaz",
  "image": "https://example.com/clinic1.jpg",
  "rating": 4.6,
  "reviewCount": 428,
  "specialties": ["Kardiologiya", "Nevrologiya"],
  "hours": {
    "monday": "08:00 - 20:00",
    "tuesday": "08:00 - 20:00",
    "wednesday": "08:00 - 18:00"
  },
  "facilities": ["Avtomobil to'xtash joyi", "Dorixona"],
  "insurance": ["O'zbekiston Respublikasi Tibbiy Sug'urta"],
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Sarvinoz Karimova",
      "specialty": "Kardiolog",
      "rating": 4.8,
      "available": true
    }
  ]
}
```

#### Doctors

##### GET /doctors
Get list of all doctors with optional filters.

**Query Parameters:**
- `search` (string): Search by doctor name or specialty
- `specialty` (string): Filter by medical specialty
- `available` (boolean): Filter by availability
- `minRating` (number): Minimum rating filter
- `clinicId` (number): Filter by clinic

**Response:**
```json
[
  {
    "id": 1,
    "name": "Dr. Sarvinoz Karimova",
    "specialty": "Kardiolog",
    "specialties": ["Yurak kasalliklari", "Gipertoniya"],
    "clinicId": 1,
    "available": true,
    "rating": 4.8,
    "reviewCount": 128,
    "experience": 12,
    "image": "https://randomuser.me/api/portraits/women/44.jpg",
    "about": "12 yillik tajribaga ega bo'lgan kardiolog",
    "education": "MD, Toshkent Tibbiyot Akademiyasi",
    "services": [
      {
        "name": "Maslahat",
        "price": 150000
      },
      {
        "name": "EKG",
        "price": 200000
      }
    ],
    "schedule": {
      "monday": "09:00 - 17:00",
      "tuesday": "09:00 - 17:00",
      "wednesday": "09:00 - 13:00"
    }
  }
]
```

##### GET /doctors/:id
Get detailed information about a specific doctor.

**Response:**
```json
{
  "id": 1,
  "name": "Dr. Sarvinoz Karimova",
  "specialty": "Kardiolog",
  "specialties": ["Yurak kasalliklari", "Gipertoniya"],
  "clinicId": 1,
  "available": true,
  "rating": 4.8,
  "reviewCount": 128,
  "experience": 12,
  "image": "https://randomuser.me/api/portraits/women/44.jpg",
  "about": "12 yillik tajribaga ega bo'lgan kardiolog",
  "education": "MD, Toshkent Tibbiyot Akademiyasi",
  "clinic": "Shahar Tibbiyot Markazi",
  "address": "123 Tibbiyot yo'li, Sog'liq shahri",
  "phone": "+998 71 123-45-67",
  "email": "sarvinoz.karimova@shahartibbiyot.uz",
  "services": [
    {
      "name": "Maslahat",
      "price": 150000
    },
    {
      "name": "EKG",
      "price": 200000
    }
  ],
  "schedule": {
    "monday": "09:00 - 17:00",
    "tuesday": "09:00 - 17:00",
    "wednesday": "09:00 - 13:00"
  },
  "reviews": [
    {
      "id": 1,
      "userName": "Aziz K.",
      "rating": 5,
      "comment": "Dr. Karimova ajoyib!",
      "date": "2025-05-15",
      "verified": true
    }
  ]
}
```

#### Appointments

##### GET /appointments
Get user's appointments (requires authentication).

**Response:**
```json
[
  {
    "id": 1,
    "doctorId": 1,
    "doctorName": "Dr. Sarvinoz Karimova",
    "specialty": "Kardiologiya",
    "clinicName": "Shahar Tibbiyot Markazi",
    "date": "2024-01-15",
    "time": "10:00",
    "status": "upcoming",
    "notes": "Yurak og'rig'i bilan bog'liq"
  }
]
```

##### POST /appointments
Book a new appointment (requires authentication).

**Request Body:**
```json
{
  "doctorId": 1,
  "date": "2024-01-15",
  "time": "10:00",
  "notes": "Yurak og'rig'i bilan bog'liq"
}
```

**Response:**
```json
{
  "id": 1,
  "doctorId": 1,
  "doctorName": "Dr. Sarvinoz Karimova",
  "specialty": "Kardiologiya",
  "clinicName": "Shahar Tibbiyot Markazi",
  "date": "2024-01-15",
  "time": "10:00",
  "status": "upcoming",
  "notes": "Yurak og'rig'i bilan bog'liq"
}
```

##### PUT /appointments/:id
Update appointment (requires authentication).

##### DELETE /appointments/:id
Cancel appointment (requires authentication).

#### User Profile

##### GET /profile
Get user profile information (requires authentication).

**Response:**
```json
{
  "personal": {
    "fullName": "Aziz Karimov",
    "email": "aziz.karimov@example.com",
    "phone": "+998 90 123-45-67",
    "dateOfBirth": "15 Mart, 1985",
    "gender": "Erkak",
    "address": "123 Sog'liq ko'chasi, Tibbiyot shahri",
    "emergencyContact": {
      "name": "Malika Karimova",
      "relationship": "Xotini",
      "phone": "+998 90 987-65-43"
    }
  },
  "medical": {
    "bloodType": "O+",
    "height": "175 sm",
    "weight": "75 kg",
    "allergies": ["Penitsillin", "Yong'oq"],
    "conditions": ["Gipertoniya (Nazorat ostida)"],
    "medications": [
      {
        "name": "Lizinopril",
        "dosage": "10mg kunlik",
        "prescribedBy": "Dr. Toshmatov"
      }
    ]
  },
  "insurance": {
    "provider": "O'zbekiston Respublikasi Tibbiy Sug'urta",
    "policyNumber": "OST123456789",
    "effectiveDate": "2024-01-01",
    "expiryDate": "2024-12-31"
  }
}
```

##### PUT /profile
Update user profile (requires authentication).

### Error Responses

All endpoints may return the following error responses:

#### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "message": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

#### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

#### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

#### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

### Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

### Data Types

#### Common Data Types

- **ID**: Integer (unique identifier)
- **Email**: String (valid email format)
- **Phone**: String (Uzbek phone format: +998 XX XXX-XX-XX)
- **Date**: String (ISO 8601 format: YYYY-MM-DD)
- **Time**: String (24-hour format: HH:MM)
- **Rating**: Number (0.0 to 5.0)
- **Price**: Number (in Uzbek som)

#### Enums

**User Roles:**
- `patient` - Regular patient
- `doctor` - Healthcare provider
- `admin` - System administrator

**Appointment Status:**
- `upcoming` - Scheduled appointment
- `completed` - Finished appointment
- `cancelled` - Cancelled appointment

**Availability:**
- `true` - Available for appointments
- `false` - Not available

---

## O'zbekcha

### Umumiy ma'lumot

Ushbu hujjat MedX sog'liqni saqlash platformasida ishlatiladigan API endpointlari va ma'lumotlar tuzilishini tavsiflaydi. Ilova hozirda rivojlanish maqsadlarida mock API xizmatidan foydalanadi.

### Asosiy URL

```
Rivojlanish: http://localhost:5173
Ishlab chiqarish: https://your-domain.com
```

### Autentifikatsiya

API autentifikatsiya uchun JWT tokenlardan foydalanadi. Tokenni Authorization header-iga kiritish kerak:

```
Authorization: Bearer <your-jwt-token>
```

### Endpointlar

#### Autentifikatsiya

##### POST /auth/login
Foydalanuvchini autentifikatsiya qilish va JWT token olish.

**So'rov tanasi:**
```json
{
  "email": "patient@example.com",
  "password": "password123"
}
```

**Javob:**
```json
{
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "name": "Aziz Karimov",
    "role": "patient"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

##### POST /auth/register
Yangi foydalanuvchi hisobini ro'yxatdan o'tkazish.

**So'rov tanasi:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User",
  "role": "patient"
}
```

#### Klinikalar

##### GET /clinics
Barcha klinikalarning ro'yxatini olish (ixtiyoriy filtrlash bilan).

**So'rov parametrlari:**
- `search` (string): Klinika nomi yoki manzili bo'yicha qidirish
- `specialty` (string): Tibbiy ixtisoslik bo'yicha filtrlash
- `rating` (number): Minimal reyting filtri

**Javob:**
```json
[
  {
    "id": 1,
    "name": "Shahar Tibbiyot Markazi",
    "address": "123 Sog'liq ko'chasi, Toshkent",
    "phone": "+998 71 123-45-67",
    "email": "info@shahartibbiyot.uz",
    "specialties": ["Kardiologiya", "Nevrologiya"],
    "rating": 4.6,
    "reviewCount": 428
  }
]
```

##### GET /clinics/:id
Muayyan klinika haqida batafsil ma'lumot olish.

**Javob:**
```json
{
  "id": 1,
  "name": "Shahar Tibbiyot Markazi",
  "address": "123 Sog'liq ko'chasi, Toshkent",
  "phone": "+998 71 123-45-67",
  "email": "info@shahartibbiyot.uz",
  "description": "To'liq xizmat ko'rsatadigan tibbiy markaz",
  "image": "https://example.com/clinic1.jpg",
  "rating": 4.6,
  "reviewCount": 428,
  "specialties": ["Kardiologiya", "Nevrologiya"],
  "hours": {
    "monday": "08:00 - 20:00",
    "tuesday": "08:00 - 20:00",
    "wednesday": "08:00 - 18:00"
  },
  "facilities": ["Avtomobil to'xtash joyi", "Dorixona"],
  "insurance": ["O'zbekiston Respublikasi Tibbiy Sug'urta"],
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Sarvinoz Karimova",
      "specialty": "Kardiolog",
      "rating": 4.8,
      "available": true
    }
  ]
}
```

#### Shifokorlar

##### GET /doctors
Barcha shifokorlarning ro'yxatini olish (ixtiyoriy filtrlash bilan).

**So'rov parametrlari:**
- `search` (string): Shifokor nomi yoki ixtisosligi bo'yicha qidirish
- `specialty` (string): Tibbiy ixtisoslik bo'yicha filtrlash
- `available` (boolean): Mavjudlik bo'yicha filtrlash
- `minRating` (number): Minimal reyting filtri
- `clinicId` (number): Klinika bo'yicha filtrlash

**Javob:**
```json
[
  {
    "id": 1,
    "name": "Dr. Sarvinoz Karimova",
    "specialty": "Kardiolog",
    "clinicId": 1,
    "available": true,
    "rating": 4.8,
    "reviewCount": 128,
    "experience": 12
  }
]
```

##### GET /doctors/:id
Muayyan shifokor haqida batafsil ma'lumot olish.

**Javob:**
```json
{
  "id": 1,
  "name": "Dr. Sarvinoz Karimova",
  "specialty": "Kardiolog",
  "specialties": ["Yurak kasalliklari", "Gipertoniya"],
  "clinicId": 1,
  "available": true,
  "rating": 4.8,
  "reviewCount": 128,
  "experience": 12,
  "image": "https://randomuser.me/api/portraits/women/44.jpg",
  "about": "12 yillik tajribaga ega bo'lgan kardiolog",
  "education": "MD, Toshkent Tibbiyot Akademiyasi",
  "clinic": "Shahar Tibbiyot Markazi",
  "address": "123 Tibbiyot yo'li, Sog'liq shahri",
  "phone": "+998 71 123-45-67",
  "email": "sarvinoz.karimova@shahartibbiyot.uz",
  "services": [
    {
      "name": "Maslahat",
      "price": 150000
    },
    {
      "name": "EKG",
      "price": 200000
    }
  ],
  "schedule": {
    "monday": "09:00 - 17:00",
    "tuesday": "09:00 - 17:00",
    "wednesday": "09:00 - 13:00"
  },
  "reviews": [
    {
      "id": 1,
      "userName": "Aziz K.",
      "rating": 5,
      "comment": "Dr. Karimova ajoyib!",
      "date": "2025-05-15",
      "verified": true
    }
  ]
}
```

#### Uchrashuvlar

##### GET /appointments
Foydalanuvchining uchrashuvlarini olish (autentifikatsiya talab qilinadi).

**Javob:**
```json
[
  {
    "id": 1,
    "doctorId": 1,
    "doctorName": "Dr. Sarvinoz Karimova",
    "specialty": "Kardiologiya",
    "clinicName": "Shahar Tibbiyot Markazi",
    "date": "2024-01-15",
    "time": "10:00",
    "status": "upcoming",
    "notes": "Yurak og'rig'i bilan bog'liq"
  }
]
```

##### POST /appointments
Yangi uchrashuv bron qilish (autentifikatsiya talab qilinadi).

**So'rov tanasi:**
```json
{
  "doctorId": 1,
  "date": "2024-01-15",
  "time": "10:00",
  "notes": "Yurak og'rig'i bilan bog'liq"
}
```

**Javob:**
```json
{
  "id": 1,
  "doctorId": 1,
  "doctorName": "Dr. Sarvinoz Karimova",
  "specialty": "Kardiologiya",
  "clinicName": "Shahar Tibbiyot Markazi",
  "date": "2024-01-15",
  "time": "10:00",
  "status": "upcoming",
  "notes": "Yurak og'rig'i bilan bog'liq"
}
```

##### PUT /appointments/:id
Uchrashuvni yangilash (autentifikatsiya talab qilinadi).

##### DELETE /appointments/:id
Uchrashuvni bekor qilish (autentifikatsiya talab qilinadi).

#### Foydalanuvchi profili

##### GET /profile
Foydalanuvchi profil ma'lumotlarini olish (autentifikatsiya talab qilinadi).

**Javob:**
```json
{
  "personal": {
    "fullName": "Aziz Karimov",
    "email": "aziz.karimov@example.com",
    "phone": "+998 90 123-45-67",
    "dateOfBirth": "15 Mart, 1985",
    "gender": "Erkak",
    "address": "123 Sog'liq ko'chasi, Tibbiyot shahri",
    "emergencyContact": {
      "name": "Malika Karimova",
      "relationship": "Xotini",
      "phone": "+998 90 987-65-43"
    }
  },
  "medical": {
    "bloodType": "O+",
    "height": "175 sm",
    "weight": "75 kg",
    "allergies": ["Penitsillin", "Yong'oq"],
    "conditions": ["Gipertoniya (Nazorat ostida)"],
    "medications": [
      {
        "name": "Lizinopril",
        "dosage": "10mg kunlik",
        "prescribedBy": "Dr. Toshmatov"
      }
    ]
  },
  "insurance": {
    "provider": "O'zbekiston Respublikasi Tibbiy Sug'urta",
    "policyNumber": "OST123456789",
    "effectiveDate": "2024-01-01",
    "expiryDate": "2024-12-31"
  }
}
```

##### PUT /profile
Foydalanuvchi profilini yangilash (autentifikatsiya talab qilinadi).

### Xatolik javoblari

Barcha endpointlar quyidagi xatolik javoblarini qaytarishi mumkin:

#### 400 Bad Request
```json
{
  "error": "Noto'g'ri so'rov ma'lumotlari",
  "message": "Validatsiya muvaffaqiyatsiz"
}
```

#### 401 Unauthorized
```json
{
  "error": "Ruxsat berilmagan",
  "message": "Autentifikatsiya talab qilinadi"
}
```

#### 404 Not Found
```json
{
  "error": "Topilmadi",
  "message": "Manba topilmadi"
}
``` 