const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // (kept; harmless)
require('dotenv').config();

const mongo = require('./Models/SetDB'); // ensures DB connects on boot (and fails fast if missing)
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const keepAlive = require('./keepAlive');

keepAlive.job.start();

// CORS: allow localhost (any port) + configured FrontEnd for development
const localhostPattern = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow non-browser or same-origin requests without Origin header
      if (!origin) return callback(null, true);
      if (localhostPattern.test(origin)) return callback(null, true);
      if (process.env.FrontEnd && origin === process.env.FrontEnd) return callback(null, true);
      // In development, relax CORS more broadly if needed
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);

// Handle preflight for all routes explicitly
app.options('*', cors());

// Limit the size of incoming requests to 50mb for image-upload and other large data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root
app.get('/', (req, res) => {
  res.send('Welcome to the Petopia API!');
});
app.post('/', (req, res) => {
  res.send('Welcome to the Petopia API!');
});

//  routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/user', require('./Routes/user'));
app.use('/api/vet', require('./Routes/vet'));
app.use('/api/trainer', require('./Routes/trainer'));
app.use('/api/pet', require('./Routes/pet'));
app.use('/api/adoption', require('./Routes/adoption'));
app.use('/api', require('./Routes/geminiWrapper'));
app.use('/api/upload', require('./Routes/upload'));
app.use('/api/verify-recaptcha', require('./Routes/reCaptcha'));
app.use('/api/guide', require('./Routes/guide'));
app.use('/api/breeds', require('./Routes/breed'));

// Centralized error handler
app.use((err, req, res, next) => {
  if (err && err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image too large. Max 6MB.' });
    }
    return res.status(400).json({ message: err.message });
  }
  if (err && err.message && /Only image files/i.test(err.message)) {
    return res.status(400).json({ message: err.message });
  }
  return res.status(500).json({ message: err?.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api`);
});
