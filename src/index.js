import './styles.css';
import domHandler from './domHandler';
import Gameboard from './Gameboard';
import GameRound from './GameRound';

let playGame = (() =>
{
    let game;

    let initialize = () =>
    {
        game = new GameRound();
        domHandler.initialize();
        domHandler.registerNewShipHandler(game.addShipToBoard);
        domHandler.registerClearGrid(game.clearBoards);
        domHandler.registerRandomizedSelection(game.selectRandomGrid);

    }
    return {initialize, game};

})();

playGame.initialize();