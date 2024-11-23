import './styles.css';
import domHandler from './domHandler';
import Gameboard from './Gameboard';

let playGame = (() =>
{
    let playerGameboard;
    let NPCBoard;

    let initialize = () =>
    {
        playerGameboard = Gameboard();
        NPCBoard = Gameboard();
        domHandler.initialize();
        domHandler.registerClearGrid(playerGameboard.clearGrid);
        domHandler.registerNewShipHandler(playerGameboard.placeShip);
    }
    return {initialize};

})();

playGame.initialize();