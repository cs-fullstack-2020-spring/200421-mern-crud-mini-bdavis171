// api routes

// reference express
const express = require('express');
const router = express.Router();
router.use(express.json());

// import schema
const LibraryCardCollection = require('../models/LibraryCardSchema');

// POST: send test data
router.post('/test',(req,res) => {
    // res.send('sending test data');
    const testData = [
        {
            name: "Brandon",
            cardNumber: 1,
            phone: 9011111111,
            zipCode: 38111
        },
        {
            name: "Dewayne",
            cardNumber: 2,
            phone: 9011111112,
            zipCode: 38112
        },
        {
            name: "Seth",
            cardNumber: 3,
            phone: 9011111113,
            zipCode: 38113
        }
    ];
    LibraryCardCollection.create(testData, (errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// POST: create new library card
router.post('/',(req,res) => {
    // res.send('new card created');
    LibraryCardCollection.create(req.body, (errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// GET: read all cards
router.get('/',(req,res) => {
    // res.send('read all cards');
    LibraryCardCollection.find( (errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// GET: read one card by card number
router.get('/:card_num', (req,res) => {
    // res.send('read by card number');
    LibraryCardCollection.findOne({cardNumber: req.params.card_num}, (errors,results) => {
        errors ? res.send(errors):res.send(results);
    })
});

// PUT: update card by card number
router.put('/:card_num', (req,res) => {
    // res.send('update card');
    LibraryCardCollection.findOneAndUpdate({cardNumber: req.params.card_num},req.body,(errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// DELETE: delete card by card number
router.delete('/:card_num', (req,res) => {
    // res.send('delete card');
    LibraryCardCollection.findOneAndDelete({cardNumber: req.params.card_num},(errors,results) => {
        errors ? res.send(errors):res.send(`The following has been deleted: ${results}`);
    });
});

// export
module.exports = router;
