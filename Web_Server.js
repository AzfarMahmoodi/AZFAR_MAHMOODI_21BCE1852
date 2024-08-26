const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let gameState = {
    // Initial game state here
};

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        
        // Handle game move and update state
        const move = JSON.parse(message);
        // Apply game logic (like in the C++ example above)
        
        // Broadcast updated state to all clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(gameState));
            }
        });
    });

    // Send initial game state
    ws.send(JSON.stringify(gameState));
});
