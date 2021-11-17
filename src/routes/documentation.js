const express = require('express');
const catchAsync = require('../error/catchAsync');

const router = express.Router();

router.all(
  '/',
  catchAsync(async (req, res, next) => {
    res.redirect(process.env.DOCUMENTATION_URL);
  })
);

module.exports = router;
