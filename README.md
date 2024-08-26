# HitWicket_assignment


## Initialize the Project
mkdir turn-based-game
cd turn-based-game
mkdir server client common

## Server-Side Implementation
cd server
npm init -y
npm install ws

## Client-Side Implementation
cd /client
npm init -y
npm install --save websocket

## Game Logic Update
moveCharacter(player, character, move) {
    // Implement the specific logic based on the character type
    // Example: Moving a Pawn
    // Validate the move and update the grid
    // If the move is valid, update the game state and return true
    // Else, return false with an error message
}

## Client-Side Validation
function isValidMove(character, move) {
    // Implement client-side validation based on character type
    return true; // Return true or false
}


