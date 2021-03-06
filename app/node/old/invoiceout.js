var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var InvoiceOutModel = require('./mongo').InvoiceOutModel;

var InvoiceOut = {
    getInvoices: getInvoices,
    findPostInvoice: findPostInvoice,
    updateInvoice: updateInvoice,

    addInvoice: addInvoice,
    removeAllInvoices: removeAllInvoices,
    removeInvoice: removeInvoice
};

module.exports.InvoiceOut = InvoiceOut;

function getInvoices(req, res) {
    return InvoiceOutModel.find(function (err, invoices) {
        if (!err) {
            return res.send(invoices);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    });
}

function findInvoice(req, res) {
    InvoiceOutModel.findOne({
        id: req.params.id
    }, function (err, invoice) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(invoice);
        res.send(invoice);
    });
}

function findPostInvoice(req, res) {
    InvoiceOutModel.findOne({
        id: req.body.id
    }, function (err, invoice) {
        if (err) {
            res.send({error: err.message});
        }
        console.log(invoice);
        res.send(invoice);
    });
}

function editInvoice(req, res) {
    InvoiceOutModel.findOne({
        id: req.params.id
    }, function (err, invoice) {
        if (err) {
            res.send({error: err.message});
        }

        invoice.name = req.params.name;

        invoice.save(function (err) {
            if (!err) {
                res.send(invoice);
            } else {
                return res.send(err);
            }
        });
    });
}

function editPostInvoice(req, res) {
    InvoiceOutModel.findOneAndUpdate({
            id: req.body.id
        },
        {$set: {name: req.body.name}},
        function (err, invoice) {
            if (!err) {
                res.send(invoice);
            } else {
                res.send({error: err.message});
            }
        });
}

function updateInvoice(req, res) {
    InvoiceOutModel.findOne({
        id: req.body.id
    }, function (err, invoice) {
        if (err) {
            res.send({error: err.message});
        }
        invoice.invoiceID = req.body.invoiceID;
        invoice.goods = req.body.goods;
        invoice.goodsID = req.body.goodsID;
        invoice.price = req.body.price;
        invoice.quantity = req.body.quantity;
        invoice.total = req.body.total;
        invoice.description = req.body.description;

        invoice.save(function (err) {
            if (!err) {
                res.send(invoice);
            } else {
                return res.send(err);
            }
        });
    });
}

function addInvoice(req, res) {
    InvoiceOutModel.create({
            id: req.body.id,
            invoiceID: req.body.invoiceID,
            goods: req.body.goods,
            goodsID: req.body.goodsID,
            price: req.body.price,
            quantity: req.body.quantity,
            total: req.body.total,
            description: req.body.description
        },
        function (err, invoice) {
            if (err) {
                return res.send({error: 'Server error'});
            }
            res.send(invoice);
        });
}

function removeAllInvoices(req, res, err) {
    InvoiceOutModel.remove({}, function (err) {
    });
    res.send('Collection Invoices removed');
}

function removeInvoice(req, res) {
    InvoiceOutModel.remove({
        "id": req.body.id
    }, function () {
        console.log('Invoice with id: ', req.body.id, ' was removed');
    });
    res.send('Invoice with id: ' + req.body.id + ' was removed');
}