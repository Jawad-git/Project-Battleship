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

