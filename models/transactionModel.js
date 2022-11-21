const mongoose = require("mongoose")
const transactionSchema = require("../schema/transactionSchema")
const Joi = require('joi');

const transaction = mongoose.model("account_statements", transactionSchema);

const validateTrs = (trs) => {
    const schema = Joi.object().keys({
        account_id: Joi.string().required(),
        credit: Joi.string(),
        debit: Joi.string()
    })
    return schema.validate(trs)
}

module.exports = {
    transaction,
    validateTrs
};
