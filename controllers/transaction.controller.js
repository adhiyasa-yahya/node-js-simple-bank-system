const { transaction } = require("../models/transactionModel")
const io = require('../routes/socket/v1/socket')

const getBalance = async (req, res) => {
    try {
        const result = await balanceChanges({
            "account_id" : req.params.account_id
        })

        return res.json({
            success: true,
            data: result
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e
        })
    }
}

const onTransaction = async (req, res) => {
    try {
        const _io = io()
        const transactions = new transaction(req.body);
        transactions.balance = await balanceChanges(req.body)
        await transactions.save();
        _io.emit('update-counter', { msg : "transaction success" })

        return res.json({
            success: true,
            data: "transaction success"
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success: false,
            message: e
        })
    }
}

const balanceChanges = async (curr) => {
    const result = await transaction.find({
        "account_id" : curr.account_id
    });

    const totalDebit = result.map((a) => parseFloat(a.debit)).reduce((acc, n) => acc + n, 0);
    const totalCredit = result.map((a) => parseFloat(a.credit)).reduce((acc, n) => acc + n, 0);
    const totalBalance = eval(totalCredit - totalDebit);

    return totalBalance;
}

const getHistory = async (req, res) => {
    try {
        const result = await transaction.find({
            "account_id" : req.params.account_id
        });

        return res.json({
            success: true,
            data: result
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e
        })
    }
}

module.exports = { getBalance, onTransaction, getHistory }
