let domHandler = (() =>
{
    let shipForm = document.getElementById("addShip");
    let boardButtons = document.getElementById("board-buttons");
    let randomSelection = document.getElementById("randomSelection");
    let manualSelection = document.getElementById("manualSelection");
    let cancelFormButton = document.getElementById("cancel");
    let submitButton = document.getElementById("submitShip");
    let startButton = document.getElementById('startGame');
    let leaveButton = document.getElementById('leaveGame');
    let errorMessage = document.getElementById('errorMessage');
    let currentTurn = document.getElementById('currentTurn');

    let cellsEnemy;

    let addShipOnSubmit;
    let clearGrid;
    let generateRandomGrid;
    let onClickHandler;
    let returnCurrentTurn;
    
    // these will be inserted through index from gameboard.js
    let registerNewShipHandler = (callback) => {
        addShipOnSubmit = callback;  // Set callback for external handler
    };

    let registerClearGrid = (callback) => {
        clearGrid = callback;  // Set callback for external handler
    };

    let registerRandomizedSelection = (callback) => {
        generateRandomGrid = callback;  // Set callback for external handler
    };

    let registerCellClickFunction = (callback) => {
        onClickHandler = callback;
    }

    let registerCurrentTurnToggle = (callback) => {
        returnCurrentTurn = callback;
    }

    let stylizeCell = (cell, status) =>
    {
        cell.classList.remove('unoccupied');
        cell.classList.add('occupied');
        if (status === 'miss')
        {
            cell.classList.add('miss');
        }
        else if (status === 'hit')
        {
            cell.classList.add('hit');
        }
    }


    // clear the dom representation of the boardgame, such as classes
    let clearCells = () =>
    {
        let cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('occupied', 'miss', 'hit', 'ship');
            cell.classList.add('unoccupied');
        });
    }
    // make the form for manual ship creatioon appear
    let showShipForm = () =>
    {
        boardButtons.classList.add("invisible")
        shipForm.classList.remove("invisible");
    }
    // hide the form, and show the buttons. maybe the user
    // wants to randomize the board or simply start over
    let hideShipForm = () =>
        {
        boardButtons.classList.remove("invisible")
        shipForm.classList.add("invisible");
    }

    function wait(ms) {
        const start = Date.now();
        while (Date.now() - start < ms) {
            // Busy wait
        }
    }

    let handleCellClick = (e) => {
        let status = onClickHandler(e.target.dataset.x, e.target.dataset.y);
        stylizeCell(e.target, status);
        e.target.removeEventListener('click', handleCellClick);
        e.target.classList.remove('clickable');
        console.log('hi');
        if (status === 'miss') {
            cellsEnemy.forEach(cell => cell.removeEventListener('click', handleCellClick));
            //switch turn indicator!
            currentTurn.innerHTML = `It is ${returnCurrentTurn()}'s turn`;
            while (true) {
                let cell = document.querySelector(`.friend .cell[data-x="${Math.floor(Math.random() * 9)}"][data-y="${Math.floor(Math.random() * 9)}"]`);
                if (cell.classList.contains('occupied')) continue;
                //wait(500);
                let status = onClickHandler(cell.dataset.x, cell.dataset.y);
                stylizeCell(cell, status);
                if (status === 'miss') {
                    currentTurn.innerHTML = `It is ${returnCurrentTurn()}'s turn`;
                    cellsEnemy = document.querySelectorAll('.enemy .unoccupied');
                    cellsEnemy.forEach(cell => {
                        cell.addEventListener('click', handleCellClick);
                        cell.classList.add('clickable');
                    });
                    break;
                }
            }
        }
    }

    let startGame = () =>
    {
        boardButtons.classList.add('invisible');
        shipForm.classList.add('invisible');
        startButton.classList.add('invisible');
        leaveButton.classList.remove('invisible');
        currentTurn.textContent = `It is ${returnCurrentTurn()}'s turn`;
        cellsEnemy = document.querySelectorAll('.enemy .unoccupied');
        cellsEnemy.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
            cell.classList.add('clickable');
        });
    }

    // reset te grid entirely, DOM and logic - MAY BE INCOMPLETE
    let resetGrid = () =>
    {
        hideShipForm();
        clearCells();
        if (clearGrid)
        {
            clearGrid();
        }
    }

    // create Ship from the user input - INCOMPLETE (add orientation)
    let createShip = () =>
    {
        let shipLength = Number(document.getElementById("shipLength").value);
        let xCoordinate = Number(document.getElementById("x-coordinate").value);
        let yCoordinate = Number(document.getElementById("y-coordinate").value);
        let orientation = document.getElementById("orientation").value;
        document.getElementById("shipLength").value = "";
        document.getElementById("x-coordinate").value = "";
        document.getElementById("y-coordinate").value = "";
        return {shipLength, xCoordinate, yCoordinate, orientation}
    }

    // add the ship at hand to te grid 
    let addShipToGrid = () => {
        if (addShipOnSubmit)
        {
            let {shipLength, xCoordinate, yCoordinate, orientation} = createShip();
            try
            {
                addShipOnSubmit(shipLength, xCoordinate, yCoordinate, orientation);
                if (orientation == 'horizontal')
                {
                    for (let y = 0; y < shipLength; y++)
                    {
                        let cell = document.querySelector(`.friend .cell[data-x="${xCoordinate}"][data-y="${yCoordinate + y}"]`);
                        cell.classList.add('ship');
                    }
                }
                else
                {
                    for (let i = 0; i < shipLength; i++)
                    {
                        let cell = document.querySelector(`.friend .cell[data-x="${xCoordinate + i}"][data-y="${yCoordinate}"]`);
                        cell.classList.add('ship');
                    }
                }
                console.log('hi');
            }
            catch (error)
            {
                document.getElementById("errorMessage").value = error;
            }
        }
    }


    // clear the previous grid and deploy a new randomized one
    let generateRandom = () =>
    {
        clearCells();
        if (clearGrid) clearGrid();
        if (generateRandomGrid){
            let friendCoordinates = generateRandomGrid();
            friendCoordinates.forEach(([x, y]) => {
                let cell = document.querySelector(`.friend .cell[data-x="${x}"][data-y="${y}"]`);
                cell.classList.add('ship');
            })
        }
    }

    let resetGame = () => {
        resetGrid();
        hideShipForm();
        leaveButton.classList.add('invisible');
        startButton.classList.remove('invisible');
        errorMessage.innerText = '';
    }

    // function too add all the event listeners
    // call as soon as DOM loads
    let initialize = () =>
    {
        manualSelection.addEventListener('click', showShipForm);
        randomSelection.addEventListener('click', generateRandom);
        cancelFormButton.addEventListener('click', resetGrid);
        submitButton.addEventListener('click', addShipToGrid);
        leaveButton.addEventListener('click', resetGame);
        startButton.addEventListener('click', startGame);
        
    }

    return {initialize, registerClearGrid, registerNewShipHandler, registerRandomizedSelection,
        registerCellClickFunction, registerCurrentTurnToggle
    };

})();

export default domHandler;