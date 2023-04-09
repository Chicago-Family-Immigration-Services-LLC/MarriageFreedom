const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user');
const documentRoutes = require('./routes/document');
const appointmentRoutes = require('./routes/appointment');
const paymentRoutes = require('./routes/payment');
const notificationRoutes = require('./routes/notification');
const subscriptionRoutes = require('./routes/subscription');
const coachingRoutes = require('./routes/coaching');
const legalConsultationRoutes = require('./routes/legalConsultation');
const mfaRoutes = require('./routes/mfa');
const captchaRoutes = require('./routes/captcha');
const automationRoutes = require('./routes/automation');
const ghostwritingRoutes = require('./routes/ghostwriting');
const blogRoutes = require('./routes/blog');
const seoRoutes = require('./routes/seo');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/document', documentRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/coaching', coachingRoutes);
app.use('/api/legalConsultation', legalConsultationRoutes);
app.use('/api/mfa', mfaRoutes);
app.use('/api/captcha', captchaRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/ghostwriting', ghostwritingRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/seo', seoRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
