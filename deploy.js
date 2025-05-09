const deploymentConfig = {
  // Frontend deployment
  frontend: {
    platform: 'vercel',
    buildCommand: 'npm run build',
    outputDirectory: 'client/build',
    environmentVariables: [
      'REACT_APP_GOOGLE_CLIENT_ID',
      'REACT_APP_GOOGLE_REDIRECT_URI',
      'REACT_APP_GITHUB_CLIENT_ID',
      'REACT_APP_GITHUB_REDIRECT_URI',
      'REACT_APP_FIREBASE_API_KEY',
      'REACT_APP_FIREBASE_AUTH_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_STORAGE_BUCKET',
      'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
      'REACT_APP_FIREBASE_APP_ID',
    ],
  },

  // Backend deployment
  backend: {
    platform: 'heroku',
    buildCommand: 'npm run build',
    startCommand: 'npm start',
    environmentVariables: [
      'PORT',
      'NODE_ENV',
      'CLIENT_URL',
      'MONGODB_URI',
      'JWT_SECRET',
      'JWT_EXPIRES_IN',
    ],
  },

  // Database deployment
  database: {
    platform: 'mongodb-atlas',
    connectionUri: process.env.MONGODB_URI,
  },

  // Authentication services
  auth: {
    google: {
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  // Firebase configuration
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  },
};

module.exports = deploymentConfig;
