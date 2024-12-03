import './styles.css';
import domHandler from './domHandler';
import Gameboard from './Gameboard';
import GameRound from './GameRound';

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
        domHandler.registerNewShipHandler(GameRound.addShipToBoard); //dysfunctional
    }
    return {initialize};

})();

playGame.initialize();