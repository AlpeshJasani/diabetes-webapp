const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as needed

// POST /api/auth/signup - User Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      // Duplicate email
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login - User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login (return user data for simplicity)
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();

// // POST /api/auth/signup - User Signup
// router.post('/signup', (req, res) => {
//   // Logic for signing up users (e.g., saving to MongoDB)
//   res.send('Signup successful');
// });

// // POST /api/auth/login - User Login
// router.post('/login', (req, res) => {
//   // Logic for logging in users (e.g., verifying password, returning JWT)
//   res.send('Login successful');
// });

// module.exports = router;
