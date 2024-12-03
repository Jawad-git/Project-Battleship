import Gameboard from "./Gameboard";
const Player = (usr = 'human', size = 10) =>
{
    let user = usr;
    let gameboard = Gameboard(size);

    const attackEnemy = (enemyBoard, x, y) => {
        return enemyBoard.receiveAttack(x, y);
    }
    return {user, gameboard, attackEnemy};
}


export default Player;