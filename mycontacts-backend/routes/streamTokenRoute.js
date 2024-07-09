const express = require('express');
const { getStreamToken } = require('../controllers/streamTokenController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/api/users/getStreamToken', streamTokenController.getStreamToken);

module.exports = router;
