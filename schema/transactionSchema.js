const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
    account_id  : Number,
    credit      : Number,
    debit       : Number,
    balance     : Number,
})