const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const secretKey = "sdhsaidoshodjs";

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
};

// Signup a new user
exports.signup = async (req, res) => {
  try {
    const { username, password, organization, role } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const user = new User({ username, organization, role });
    await user.setPassword(password); // Assuming you're using passport-local-mongoose

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not create user' });
  }
};

// Login a user
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {



    if (err || !user) {
      return res.status(401).json({ error: 'Login failed' });
    }

    // Create token
    const token = jwt.sign(
      { user_id: user._id,role:user.role },
      secretKey,
      {
        expiresIn: "2h",
      }
    );

    // Send the token in the response
    res.json({ token });
  })(req, res, next);
};



// Get all users
exports.getAllUsers = async (req, res) => {
  const currentUser = req.user; // Assuming you have Passport user in the request

  console.log(currentUser)

  try {
    if (currentUser.role === 'admin') {
      const users = await User.find();
      res.status(200).json(users);
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve users' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user; // Assuming you have Passport user in the request

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If the user is an admin or the user is accessing their own data
    if (currentUser.role === 'admin' || currentUser._id.toString() === id) {
      res.status(200).json(user);
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve user' });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Could not update user' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user' });
  }
};
