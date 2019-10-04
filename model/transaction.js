var mongoose = require('mongoose');
var express = require("express");


var transactionSchema = mongoose.Schema({
    transactionid: String,
    transferto: String,
    amount:Number,
    date: Date,
    description: String,
})
var transaction = module.exports = mongoose.model('transaction', transactionSchema);
module.exports.getTransactions = function (callback) {
    user.findOne({}, callback);
}
module.exports.addTransaction = function (newtransaction, callback) {
    console.log(newtransaction);
    newtransaction.save(callback);
}
