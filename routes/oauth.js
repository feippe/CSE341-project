const express = require('express');
const router = express.Router();
const oauth = require('../controllers/oauth');

router.post('/token', oauth.token);

router.get('/protected', oauth.authenticate, (req, res) => {
    res.json({ message: 'Authorized access', user: req.user });
});

module.exports = router;
