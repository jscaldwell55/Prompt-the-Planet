require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;

// Validate MongoDB URI format if it exists
if (mongoUri) {
  if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    console.error('Warning: MONGODB_URI does not start with mongodb:// or mongodb+srv://');
    console.error('Current value:', mongoUri);
  }
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: mongoUri,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET || 'development-jwt-secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};