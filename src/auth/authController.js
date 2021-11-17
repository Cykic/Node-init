const jwt = require('jsonwebtoken');
const AppError = require('../error/apiError');

const generateToken = user =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

exports.sendLoginToken = (user, statuscode, req, res) => {
  const token = generateToken(user);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };

  // cookie
  res.cookie('accessToken', token, cookieOption);
  const { name, phone, role } = user;
  res.status(statuscode).json({
    status: 'success',
    message: 'Successfully Logged in',
    token,
    user: { name, phone, role }
  });
};

// AUTHORIZATION

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user role is part of the role that hass access to the next middleware
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission for this route', 403)
      );
    }
    next();
  };
};
