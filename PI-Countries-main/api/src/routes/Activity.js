const express = require('express');
const router = express.Router();
const { createActivity } = require('../controllers/activity.controller.js');

router.post('/', createActivity);


module.exports = router;