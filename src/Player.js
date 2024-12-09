import Gameboard from "./Gameboard";
const Player = (usr = 'human', size = 10) =>
{
    let user = usr;
    let gameboard = Gameboard(size);

    const attackEnemy = (enemyBoard, x, y) => {
        return {...enemyBoard.receiveAttackWrapper(x, y),
        user};
    }
    return {user, gameboard, attackEnemy};
}


export default Player;