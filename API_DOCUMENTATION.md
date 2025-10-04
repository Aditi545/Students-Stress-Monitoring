# 🎨 Students Stress Monitoring API Documentation

## 🚀 **Beautiful API Routes for Signup, Login & Feedback**

### **🔐 Authentication Routes (`/api/auth`)**

#### **POST `/api/auth/register`** - User Registration
```json
{
  "username": "johndoe",
  "email": "john@example.com", 
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "✅ User registered successfully!",
  "data": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### **POST `/api/auth/login`** - User Login
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "✅ Login successful!",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

---

### **📝 Feedback Routes (`/api/feedback`)**

#### **POST `/api/feedback`** - Submit Feedback
```json
{
  "rating": 5,
  "category": "UI/UX",
  "title": "Love the new design!",
  "message": "The interface is so clean and intuitive",
  "priority": "Low",
  "tags": ["design", "positive"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "✅ Feedback submitted successfully!",
  "data": {
    "id": "feedback_id",
    "rating": 5,
    "category": "UI/UX",
    "title": "Love the new design!",
    "status": "Pending",
    "priority": "Low",
    "createdAt": "2025-01-04T10:30:00.000Z"
  }
}
```

#### **GET `/api/feedback`** - Get User Feedback History
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (Pending, In Review, Resolved, Closed)
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "message": "📋 Feedback history retrieved",
  "data": {
    "feedback": [...],
    "pagination": {
      "current": 1,
      "total": 3,
      "count": 10,
      "totalRecords": 25
    }
  }
}
```

#### **GET `/api/feedback/stats`** - Get Feedback Statistics
**Response:**
```json
{
  "success": true,
  "message": "📊 Feedback statistics generated",
  "data": {
    "overview": {
      "totalFeedback": 15,
      "averageRating": 4.2,
      "categoryStats": [...]
    },
    "categoryBreakdown": [
      {
        "_id": "UI/UX",
        "count": 5,
        "avgRating": 4.5
      }
    ],
    "statusBreakdown": [
      {
        "_id": "Resolved",
        "count": 8
      }
    ]
  }
}
```

#### **PUT `/api/feedback/:id`** - Update Feedback Status
```json
{
  "status": "Resolved",
  "adminResponse": "Thank you for your feedback! We've implemented your suggestion."
}
```

#### **GET `/api/feedback/health`** - Health Check
**Response:**
```json
{
  "success": true,
  "message": "🎨 Feedback API is running beautifully!",
  "timestamp": "2025-01-04T10:30:00.000Z",
  "endpoints": {
    "POST /": "Submit new feedback",
    "GET /": "Get user feedback history", 
    "GET /stats": "Get feedback statistics",
    "PUT /:id": "Update feedback status",
    "GET /health": "Health check"
  }
}
```

---

### **📊 Stress Monitoring Routes (`/api/stress`)**

#### **POST `/api/stress`** - Log Stress Entry
```json
{
  "stressLevel": 7,
  "symptoms": ["headache", "fatigue"],
  "notes": "Feeling overwhelmed with work"
}
```

#### **GET `/api/stress`** - Get Stress History
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "stressLevel": 7,
      "symptoms": ["headache", "fatigue"],
      "notes": "Feeling overwhelmed with work",
      "createdAt": "2025-01-04T10:30:00.000Z"
    }
  ]
}
```

---

### **🧠 Analysis Routes (`/api/analysis`)**

#### **GET `/api/analysis`** - Get Stress Analysis
**Response:**
```json
{
  "success": true,
  "data": {
    "totalEntries": 15,
    "averageStress": 6.2,
    "recentTrend": "📈 Increasing",
    "insights": [
      "Your stress levels have been trending higher recently. Take some time to reflect on what might have changed."
    ]
  }
}
```

---

## 🎨 **Beautiful Features**

### **✨ Styled Responses**
- **Emojis** for visual appeal
- **Color-coded** status messages
- **Structured** JSON responses
- **Detailed** error handling

### **🔒 Security Features**
- **JWT Authentication** for all protected routes
- **Input validation** and sanitization
- **Rate limiting** ready
- **CORS** configured

### **📈 Advanced Features**
- **Pagination** for large datasets
- **Filtering** by multiple criteria
- **Statistics** and analytics
- **Real-time** status updates

### **🎯 API Categories**
- **Authentication**: Signup, Login, JWT
- **Stress Monitoring**: Log entries, View history
- **Analysis**: AI-powered insights
- **Feedback**: User feedback system
- **Health**: System monitoring

---

## 🚀 **Quick Start**

1. **Start Backend**: `npm run dev`
2. **Start Frontend**: `npm run frontend`
3. **Visit**: `http://localhost:3000`
4. **API Base**: `http://localhost:5000/api`

**All routes are beautifully styled with emojis, proper error handling, and comprehensive documentation!** 🎨✨
