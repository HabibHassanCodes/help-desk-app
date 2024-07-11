const bcrypt = require('bcrypt');

const hashPasswordMiddleware = async (req, res, next) => {
    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      next();
    } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ error: 'Internal server error; Middleware Function' });
    }
};

module.exports = {
    hashPasswordMiddleware
};