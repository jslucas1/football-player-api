module.exports = (app) => {
    const players = require('../controllers/player.controller.js');

    // Create a new player
    app.post('/players', players.create);

    // Retrieve all players
    app.get('/players', players.findAll);

    // Retrieve a single player with playerId
    app.get('/players/:playerId', players.findOne);

    // Update a player with playerId
    app.put('/players/:playerId', players.update);

    // Delete a player with playerId
    app.delete('/players/:playerId', players.delete);
}