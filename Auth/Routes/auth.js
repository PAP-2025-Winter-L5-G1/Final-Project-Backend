const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/User'); 

// User registration
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user into the database
    User.createUser(username, hashedPassword, email, (err, userId) => {
      if (err) {
        return res.status(500).json({ error: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully', userId });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  User.findUserByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.userId }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
});

module.exports = router;
