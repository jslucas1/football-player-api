const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: String,
    position: String,
    yards: Number,
    touchdowns: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Player', PlayerSchema);