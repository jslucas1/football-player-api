const Player = require('../models/player.model.js');

// Create and Save a new player
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Player content can not be empty"
        });
    }

    // Create a Player
    const player = new Player({
        name: req.body.name,
        position: req.body.position,
        yards: req.body.yards,
        touchdowns: req.body.touchdowns
    });

    // Save Player in the database
    player.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the player."
        });
    });
};

// Retrieve and return all players from the database.
exports.findAll = (req, res) => {
    Player.find()
    .then(players => {
        res.send(players);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playes."
        });
    });
};

// Find a single player with a playerId
exports.findOne = (req, res) => {
    Player.findById(req.params.playerId)
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });            
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving player with id " + req.params.playerId
        });
    });
};

// Update a player identified by the playerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Player content can not be empty"
        });
    }

    // Find player and update it with the request body
    Player.findByIdAndUpdate(req.params.playerId, {
        name: req.body.name,
        position: req.body.position,
        yards: req.body.yards,
        touchdowns: req.body.touchdowns
    }, {new: true})
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: "Error updating player with id " + req.params.playerId
        });
    });
};

// Delete a player with the specified playerId in the request
exports.delete = (req, res) => {
    Player.findByIdAndRemove(req.params.playerId)
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send({message: "Player deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete player with id " + req.params.playerId
        });
    });
};