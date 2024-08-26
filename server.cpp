#include <iostream>
#include <vector>
#include <map>
#include <string>

using namespace std;

class Game {
public:
    Game() {
        // Initialize the 5x5 board with empty strings
        board = vector<vector<string>>(5, vector<string>(5, ""));
    }

    void initializeBoard() {
        // Example of initializing the board with players' characters
        board[0] = {"A-P1", "A-H1", "A-H2", "A-P2", "A-P3"};
        board[4] = {"B-P1", "B-H1", "B-H2", "B-P2", "B-P3"};
    }

    void printBoard() {
        for (auto &row : board) {
            for (auto &cell : row) {
                cout << (cell.empty() ? "-" : cell) << " ";
            }
            cout << endl;
        }
    }

    bool move(string player, string character, string direction) {
        // Locate the character on the board
        pair<int, int> pos = findCharacter(player, character);
        if (pos.first == -1) return false;

        int x = pos.first, y = pos.second;
        board[x][y] = "";  // Remove from current position

        if (direction == "L") y--;
        else if (direction == "R") y++;
        else if (direction == "F") x--;
        else if (direction == "B") x++;
        else return false;

        // Check boundaries
        if (x < 0 || x >= 5 || y < 0 || y >= 5) return false;

        // Handle combat (if the target position has an opponent)
        if (!board[x][y].empty() && board[x][y][0] != player[0]) {
            board[x][y] = "";  // Remove the opponent character
        }

        // Move to the new position
        board[x][y] = player + "-" + character;
        return true;
    }

private:
    vector<vector<string>> board;

    pair<int, int> findCharacter(string player, string character) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                if (board[i][j] == player + "-" + character)
                    return {i, j};
            }
        }
        return {-1, -1};  // Not found
    }
};

int main() {
    Game game;
    game.initializeBoard();
    game.printBoard();

    // Example move
    game.move("A", "P1", "R");
    game.printBoard();

    return 0;
}
