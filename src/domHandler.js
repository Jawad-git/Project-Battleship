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
    // - MAY BE INCOMPLETE
    let clearCells = () =>
    {
        let cells = document.querySelectorAll('cell')
        cells.forEach(cell => {
            cell.classList.remove('occupied');
            // also add hit, or missed for enemy board
        })
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
        let shipLength = document.getElementById("shipLength").value;
        let xCoordinate = document.getElementById("x-coordinate").value;
        let yCoordinate = document.getElementById("y-coordinate").value;
        let orientation = document.getElementById("orientation").value;
        document.getElementById("shipLength").value = "";
        document.getElementById("x-coordinate").value = "";
        document.getElementById("y-coordinate").value = "";
        return {shipLength, xCoordinate, yCoordinate, orientation}
    }

    // add the ship at hand to te grid 
    // MAY want to add orientation to callback
    let addShipToGrid = () => {
        if (addShipOnSubmit)
        {
            let {shipLength, xCoordinate, yCoordinate, orientation} = createShip();
            try
            {
                addShipOnSubmit(shipLength, xCoordinate, yCoordinate, orientation)
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

    // INCOMPLETE
    let generateRandom = () =>
    {
        resetGrid();
        if (generateRandomGrid) generateRandomGrid();
        // add class to ships
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

    return {initialize, registerClearGrid, registerNewShipHandler};

})();

export default domHandler;