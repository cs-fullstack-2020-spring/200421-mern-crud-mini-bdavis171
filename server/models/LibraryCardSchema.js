// library card schema

// reference mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define LibraryCardSchema
const LibraryCardSchema = new Schema(
    {
        name: String,
        cardNumber: {type: Number,unique: true},
        phone: Number,
        zipCode: Number
    },
    {timestamps: true}
);

// export
module.exports = mongoose.model('libraryCard',LibraryCardSchema);