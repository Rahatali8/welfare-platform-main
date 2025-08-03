# Welfare Platform - Complete Full-Stack Application

A comprehensive welfare platform built with Next.js, React, and MySQL for managing financial assistance requests and donations.

## 🌟 Features

### Authentication System
- CNIC-based registration and login
- Secure password hashing with bcrypt
- JWT token authentication
- Role-based access control (User, Admin, Donor)

### User Dashboard
- Profile management
- Request submission for different assistance types
- Real-time status tracking
- CNIC-based search functionality

### Request Types
1. **Loan Applications** - Business and personal loans up to PKR 500,000
2. **Microfinance** - Daily essentials and grocery assistance up to PKR 50,000
3. **General Help** - Emergency financial assistance up to PKR 100,000

### Admin Dashboard
- View and manage all requests
- Approve/reject applications
- Comprehensive analytics
- Advanced filtering and search

### Donor Dashboard
- View approved requests
- Make donations to specific requests
- Track donation history
- Impact analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start (Without Database)

1. **Clone and Install**
\`\`\`bash
git clone <repository-url>
cd welfare-platform
npm install
\`\`\`

2. **Environment Setup**
\`\`\`bash
# Copy environment file
cp .env.local.example .env.local

# Update JWT_SECRET in .env.local with a secure random string
\`\`\`

3. **Run Application**
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000`

### With Database Setup

1. **Install MySQL 8.0+**

2. **Create Database**
\`\`\`bash
mysql -u root -p
CREATE DATABASE welfare_platform;
exit
\`\`\`

3. **Update Database Connection**
\`\`\`bash
# Update .env.local with your database credentials:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=welfare_platform
\`\`\`

4. **Replace Mock Database**
- Replace the mock implementation in `lib/db.ts` with real MySQL connection
- Run the SQL scripts in `scripts/` folder to create tables
- Uncomment the mysql2 dependency in package.json

## 🔐 Test Accounts (Mock Data)

### Admin Account
- **CNIC:** 1234567890123
- **Password:** admin123

### Donor Account  
- **CNIC:** 9876543210987
- **Password:** donor123

### Regular User
- **CNIC:** Any other 13-digit number
- **Password:** Any password

## 📱 User Journey

1. **Homepage** → Professional landing page
2. **Registration** → CNIC-based signup
3. **Login** → Secure authentication
4. **Dashboard** → Role-specific interface
5. **Applications** → Submit assistance requests
6. **Tracking** → Monitor application status
7. **Admin/Donor** → Review and support requests

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** + **shadcn/ui** components
- **Responsive design** for all devices

### Backend
- **Next.js API Routes** for server-side logic
- **JWT authentication** with HTTP-only cookies
- **bcrypt** for password hashing
- **File upload** handling for CNIC images

### Database (When Connected)
- **MySQL** with optimized schema
- **Foreign key relationships**
- **JSON fields** for flexible additional data
- **Indexed queries** for performance

## 📊 Database Schema (For MySQL Setup)

### Users Table
\`\`\`sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cnic VARCHAR(13) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'donor') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Requests Table  
\`\`\`sql
CREATE TABLE requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('loan', 'microfinance', 'general') NOT NULL,
  reason TEXT NOT NULL,
  amount DECIMAL(10, 2),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  current_address TEXT NOT NULL,
  cnic_image VARCHAR(255),
  additional_data JSON,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

### Donations Table
\`\`\`sql
CREATE TABLE donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT NOT NULL,
  request_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);
\`\`\`

## 🔒 Security Features

- **Password hashing** with bcrypt (12 rounds)
- **JWT tokens** with HTTP-only cookies
- **Role-based access control**
- **Input validation** on frontend and backend
- **File upload security** (size limits, type validation)
- **Environment variable protection**

## 📈 Current Status

### ✅ Completed Features
- Complete authentication system
- All three dashboards (User, Admin, Donor)
- All application forms (Loan, Microfinance, General)
- Professional UI/UX design
- Role-based access control
- Mock data for testing

### 🔄 Database Integration
- Currently using mock data
- Ready for MySQL integration
- All SQL schemas provided
- Easy migration path

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Configuration

### Environment Variables
\`\`\`env
# Database (when ready to connect)
DB_HOST=localhost
DB_USER=root  
DB_PASSWORD=your_password
DB_NAME=welfare_platform

# Authentication (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
\`\`\`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout

### User Operations
- `GET /api/user/profile` - Get user profile
- `GET /api/user/requests` - Get user requests
- `GET /api/user/search` - Search requests by CNIC

### Request Management
- `POST /api/requests/submit` - Submit new request

### Admin Operations
- `GET /api/admin/requests` - Get all requests
- `GET /api/admin/analytics` - Get admin analytics
- `POST /api/admin/update-status` - Update request status

### Donor Operations  
- `GET /api/donor/requests` - Get approved requests
- `GET /api/donor/analytics` - Get donor analytics
- `POST /api/donor/donate` - Make donation

## 🔄 Database Migration Steps

When ready to connect to MySQL:

1. **Install MySQL dependency**
\`\`\`bash
npm install mysql2
\`\`\`

2. **Update lib/db.ts**
\`\`\`typescript
import mysql from "mysql2/promise"

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "welfare_platform",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

export const db = mysql.createPool(dbConfig)
\`\`\`

3. **Run SQL scripts**
\`\`\`bash
mysql -u root -p welfare_platform < scripts/init-database.sql
mysql -u root -p welfare_platform < scripts/seed-data.sql
\`\`\`

4. **Update environment variables**

## 🎨 UI/UX Features

- **Professional design** with modern aesthetics
- **Mobile-responsive** layout
- **Loading states** and error handling
- **Toast notifications** for user feedback
- **Form validation** with helpful messages
- **Accessibility** compliance
- **Consistent color scheme**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, create an issue in the repository.

---

**Note:** This project is currently configured with mock data for easy testing. Follow the database migration steps above when ready to connect to MySQL.
