import Player from "./Player"
import Ship from "./ship";
class GameRound {
    constructor(player1 = 'human', player2 = 'npc') {
        this.player = Player('human');
        this.npc = Player('npc');
        this.currentPlayer = this.player;
        this.addShipToBoard = this.addShipToBoard.bind(this); // Automatically bind methods
        this.clearBoards = this.clearBoards.bind(this); // Automatically bind methods
        this.selectRandomGrid = this.selectRandomGrid.bind(this); // Automatically bind methods
        this.attackPosition = this.attackPosition.bind(this); // Automatically bind methods
        this.returnTurn = this.returnTurn.bind(this); // Automatically bind methods
    }
    switchTurns() {
        this.currentPlayer = this.currentPlayer === this.player ? this.npc : this.player;
    }

    attackPosition(x, y) {
        if (this.currentPlayer == this.player) {
            let {status, shipCoordinates, user} = this.currentPlayer.attackEnemy(this.npc.gameboard, x, y);
            console.log('you struck');
            if (status === 'hit' || status === 'sink') {
                return {status, shipCoordinates, user}
            }
            else if (status === 'allShipsSunken') {
                return {status, shipCoordinates, user, victoryMessage: `${user} has won! they have sunk all their enemy ships!`};
            }
            else {
                this.switchTurns();
                return {status, shipCoordinates, user};
            }
        }
        else {
            console.log('npc struck');
            let {status, shipCoordinates, user} = this.currentPlayer.attackEnemy(this.player.gameboard, x, y);
            if (status === 'hit' || status === 'sink') {
                return {status, shipCoordinates, user}
            }
            else if (status === 'allShipsSunken') {
                return {status, shipCoordinates, user, victoryMessage: `${user} has won! they have sunk all their enemy ships!`};
            }
            else {
                this.switchTurns();
                return {status, shipCoordinates, user};
            }
        }
    }
    addShipToBoard(shipLength, x, y, orient) {
        this.player.gameboard.placeShip(new Ship(shipLength), x, y, orient);
        this.npc.gameboard.placeRandomShip(shipLength); // place a random enemy ship of the same length
        console.log(this.npc.gameboard.occupiedCoordinates);
    }
    clearBoards() {
        this.player.gameboard.clearGrid();
        this.npc.gameboard.clearGrid();
        console.log(this.npc.gameboard.occupiedCoordinates);
        console.log(this.npc.gameboard.ships);

    }
    selectRandomGrid() {
        this.player.gameboard.generateRandom();
        this.npc.gameboard.generateRandom();
        return this.player.gameboard.occupiedCoordinates;
    }

    returnTurn() {
        return this.currentPlayer.user;
    }
}





export default GameRound;


// issue caused by 'this' in event listener?
// Cannot read properties of undefined (reading 'player') is being solved by 'automatically binding
// methods', this is caused by this complications inside event listeners, come back to this later.