// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yoga_app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Routes
// User registration
app.post('/api/users/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'secret_token',
      { expiresIn: '1d' }
    );

    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Existing MediaPipe routes
app.post('/api/mediapipe/yog1', (req, res) => {
  // Your existing code for yoga pose 1
  console.log("Yoga pose 1 initiated");
  res.status(200).json({ message: 'Yoga pose 1 initiated' });
});

app.post('/api/mediapipe/yog2', (req, res) => {
  // Your existing code for yoga pose 2
  console.log("Yoga pose 2 initiated");
  res.status(200).json({ message: 'Yoga pose 2 initiated' });
});

app.post('/api/mediapipe/yog3', (req, res) => {
  // Your existing code for yoga pose 3
  console.log("Yoga pose 3 initiated");
  res.status(200).json({ message: 'Yoga pose 3 initiated' });
});

app.post('/api/mediapipe/yog4', (req, res) => {
  console.log("Yoga pose 4 initiated");
  res.status(200).json({ message: 'Yoga pose 4 initiated' });
});

app.post('/api/mediapipe/yog5', (req, res) => {
  console.log("Yoga pose 5 initiated");
  res.status(200).json({ message: 'Yoga pose 5 initiated' });
});

app.post('/api/mediapipe/yog6', (req, res) => {
  console.log("Yoga pose 6 initiated");
  res.status(200).json({ message: 'Yoga pose 6 initiated' });
});

// Auth middleware for protected routes
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_token');
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Protected route example
app.get('/api/users/me', auth, async (req, res) => {
  res.json(req.user);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});