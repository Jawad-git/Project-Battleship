import Player from "./Player"
function GameRound (player1, player2 = npc)
{
    this.player = new Player('human');
    this.npc = new Player('npc');
    this.currentPlayer = this.player;
}

GameRound.prototype.switchTurns = function (){
    this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
}

GameRound.prototype.addShipToBoard = function (ship, x, y, orient){
    this.player.gameboard.placeShip(ship, x, y, orient);
    // place a random enemy ship of random length
    this.npc.gameboard.placeRandomShip(enemyShip.length);
}

GameRound.prototype.clearBoards = function (){
    this.player.gameboard.clearGrid();
    this.npc.gameboard.clearGrid();
}

GameRound.prototype.selectRandomGrid = function () {
    this.player.gameboard.generateRandom();
    this.npc.gameboard.generateRandom();
}
