const WebSocket = require('ws');
const Game = require('../common/game');

const wss = new WebSocket.Server({ port: 8080 });
const game = new Game();

wss.on('connection', (ws) => {
    ws.send(JSON.stringify({ type: 'init', state: game.getGameState() }));

    ws.on('message', (message) => {
        const { player, command } = JSON.parse(message);
        const [character, move] = command.split(':');

        const result = game.moveCharacter(player, character, move);

        if (result.valid) {
            wss.clients.forEach(client => {
                client.send(JSON.stringify({ type: 'update', state: game.getGameState() }));
            });
        } else {
            ws.send(JSON.stringify({ type: 'invalid', message: result.message }));
        }
    });
});
