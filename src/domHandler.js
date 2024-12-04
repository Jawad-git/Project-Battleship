let domHandler = (() =>
{
    let shipForm = document.getElementById("addShip");
    let boardButtons = document.getElementById("board-buttons");
    let randomSelection = document.getElementById("randomSelection");
    let manualSelection = document.getElementById("manualSelection");
    let cancelFormButton = document.getElementById("cancel");
    let submitButton = document.getElementById("submitShip");


    let addShipOnSubmit;
    let clearGrid;
    let generateRandomGrid;

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

    // function too add all the event listeners
    // call as soon as DOM loads
    let initialize = () =>
    {
        manualSelection.addEventListener('click', showShipForm);
        randomSelection.addEventListener('click', generateRandom);
        cancelFormButton.addEventListener('click', resetGrid);
        submitButton.addEventListener('click', addShipToGrid);
        
    }

    return {initialize, registerClearGrid, registerNewShipHandler, registerRandomizedSelection};

})();

export default domHandler;