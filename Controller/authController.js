const Account = require('../Models/accountModel');
// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user WITH password
    const user = await Account.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Store session
    req.session.userId = user._id;

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// LOGOUT
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }

    res.clearCookie('connect.sid'); // default session cookie name
    res.json({ message: 'Logged out successfully' });
  });
};


// GET CURRENT USER
exports.getProfile = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await Account.findById(req.session.userId).populate('profile');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//  SIGNUP
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await Account.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Account with this email already exists'
      });
    }

    // Create new account
    const user = await Account.create({ email, password });

    // Store session immediately (auto-login after signup)
    req.session.userId = user._id;

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

