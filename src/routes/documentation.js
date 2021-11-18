const express = require('express');
const catchAsync = require('../error/catchAsync');

const router = express.Router();

router.all(
  '/',
  async (_, res, ) => {
    res.redirect(process.env.DOCUMENTATION_URL);
  }
);

module.exports = router;
