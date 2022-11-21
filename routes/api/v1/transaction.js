const express = require('express');
const { getBalance, onTransaction, getHistory } = require('../../../controllers/transaction.controller');
const { authenticateToken } = require("../../../middleware/authJwt");
const router = express.Router();

router.get("/get-balance/:account_id", getBalance)
router.get('/history/:account_id', getHistory)
router.post('/transaction', onTransaction)

module.exports = router ;
