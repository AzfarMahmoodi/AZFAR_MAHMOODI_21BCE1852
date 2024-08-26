<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess-like Game</title>
    <style>
        /* Basic styles for the game board */
        #board {
            display: grid;
            grid-template-columns: repeat(5, 50px);
            grid-template-rows: repeat(5, 50px);
            gap: 5px;
        }
        .cell {
            width: 50px;
            height: 50px;
            border: 1px solid #000;
            text-align: center;
            line-height: 50px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1>Chess-like Game</h1>
    <div id="board"></div>

    <script>
        const boardElement = document.getElementById('board');
        
        function renderBoard(state) {
            boardElement.innerHTML = '';
            for (let i = 0; i < state.length; i++) {
                for (let j = 0; j < state[i].length; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.textContent = state[i][j] || '';
                    boardElement.appendChild(cell);
                }
            }
        }

        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = function(event) {
            const gameState = JSON.parse(event.data);
            renderBoard(gameState.board);
        };

        // Send moves to the server
        function sendMove(move) {
            ws.send(JSON.stringify(move));
        }

        // Example: sendMove({player: 'A', character: 'P1', direction: 'R'});
    </script>
</body>
</html>
