const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'init' || message.type === 'update') {
        renderGameBoard(message.state);
    } else if (message.type === 'invalid') {
        alert(message.message);
    }
};

function renderGameBoard(state) {
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (state[i][j]) {
                cell.textContent = `${state[i][j].player}-${state[i][j].character}`;
            }
            board.appendChild(cell);
        }
    }
}
