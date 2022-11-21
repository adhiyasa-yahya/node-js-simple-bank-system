const express = require('express');
const { register, profile } = require("../../../controllers/user.controller");
const { authenticateToken } = require("../../../middleware/authJwt");
const router = express.Router();

router.get('/', async function(req, res) {
  res.send("hello iam under the water, please help me!!")
});

router.post('/register', register)
router.get('/profile/:id', authenticateToken , profile)

module.exports = router;
