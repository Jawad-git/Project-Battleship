import Gameboard from "./Gameboard";
const Player = (user = 'human', size = 10) =>
{
    const user = user;
    let gameboard = Gameboard(size);
    return {user, gameboard};
}

Player.prototype.attackEnemy = function (enemyBoard, x, y){
    return enemyBoard.receiveAttack(x, y);
}

export default Player;