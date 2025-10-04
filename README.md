# Students Stress Monitoring API

A comprehensive backend API for monitoring and analyzing student stress levels with intelligent insights and personalized recommendations.

## Features

- 🔐 **Secure Authentication** - JWT-based user authentication
- 📊 **Stress Tracking** - Log and monitor stress levels with symptoms
- 🧠 **Intelligent Analysis** - AI-powered insights and trend analysis
- 🛡️ **Protected Routes** - Secure access to personal data
- 📈 **Real-time Analytics** - Personalized stress pattern analysis

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **Environment**: dotenv for configuration

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Start the server: `npm run dev`

## API Documentation

### Authentication

#### `POST /api/auth/register`
Creates a new user account.

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### `POST /api/auth/login`
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Stress Data (Requires Bearer Token)

#### `POST /api/stress`
Submits a new stress entry for the authenticated user.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "stressLevel": 8,
  "symptoms": ["headache", "fatigue", "anxiety"],
  "notes": "Feeling overwhelmed with exams"
}
```

**Response:**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "user": "60f7b3b3b3b3b3b3b3b3b3b3",
  "stressLevel": 8,
  "symptoms": ["headache", "fatigue", "anxiety"],
  "notes": "Feeling overwhelmed with exams",
  "createdAt": "2023-07-20T10:30:00.000Z",
  "updatedAt": "2023-07-20T10:30:00.000Z"
}
```

#### `GET /api/stress`
Retrieves all stress entries for the authenticated user.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "stressLevel": 8,
    "symptoms": ["headache", "fatigue"],
    "notes": "Feeling overwhelmed",
    "createdAt": "2023-07-20T10:30:00.000Z"
  }
]
```

### Analysis (Requires Bearer Token)

#### `GET /api/analysis`
Returns an intelligent analysis of the user's stress data with personalized insights.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "totalEntries": 15,
  "averageStress": "6.20",
  "recentAverageStress": "7.33",
  "insights": [
    "Your stress levels have been trending higher recently. Take some time to reflect on what might have changed.",
    "A significant number of your entries indicate high stress. Consider talking to a professional or a trusted friend."
  ]
}
```

### Health Check

#### `GET /`
Returns API status and health information.

**Response:**
```json
{
  "message": "Stress Analysis API is running!"
}
```

## Error Handling

The API includes comprehensive error handling:

- **404 Not Found**: Returns JSON error for non-existent endpoints
- **401 Unauthorized**: Returns error for invalid or missing tokens
- **500 Server Error**: Returns error for server-side issues

**Error Response Format:**
```json
{
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stressApp
JWT_SECRET=your-super-secret-jwt-key
```

## Usage Examples

### Complete Workflow

1. **Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"student","email":"student@university.edu","password":"securepass"}'
```

2. **Login to get token:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@university.edu","password":"securepass"}'
```

3. **Submit stress entry:**
```bash
curl -X POST http://localhost:5000/api/stress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"stressLevel":7,"symptoms":["headache"],"notes":"Midterm stress"}'
```

4. **Get analysis:**
```bash
curl -X GET http://localhost:5000/api/analysis \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Development

- **Start development server**: `npm run dev`
- **Production start**: `npm start`
- **Environment**: Development uses nodemon for auto-restart

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
