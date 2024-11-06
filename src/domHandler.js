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

    let clearCells = () =>
    {
        let cells = document.querySelectorAll('cell')
        cells.forEach(cell => {
            cell.classList.remove('occupied');
        })
    }
    let showShipForm = () =>
    {
        boardButtons.classList.add("invisible")
        shipForm.classList.remove("invisible");
    }

    let hideShipForm = () =>
    {
        boardButtons.classList.remove("invisible")
        shipForm.classList.add("invisible");
    }

    let resetGrid = () =>
    {
        hideShipForm();
        clearCells();
        if (clearGrid)
        {
            clearGrid();
        }
    }

    let createShip = () =>
    {
        let shipLength = document.getElementById("shipLength").value;
        let xCoordinate = document.getElementById("x-coordinate").value;
        let yCoordinate = document.getElementById("y-coordinate").value;
        document.getElementById("shipLength").value = "";
        document.getElementById("x-coordinate").value = "";
        document.getElementById("y-coordinate").value = "";
        return {shipLength, xCoordinate, yCoordinate}
    }

    let addShipToGrid = (placeShip) => {
        if (addShipOnSubmit)
        {
            let {shipLength, xCoordinate, yCoordinate} = createShip();
            try
            {
                callback(shipLength, xCoordinate, yCoordinate)
            }
            catch (error)
            {
                document.getElementById("errorMessage").value = error;
            }
        }
    }

    let registerNewShipHandler = (callback) => {
        addShipOnSubmit = callback;  // Set callback for external handler
    };

    let registerClearGrid = (callback) => {
        clearGrid = callback;  // Set callback for external handler
    };

    let generateRandom = () =>
    {

    }

    let initialize = () =>
    {
        manualSelection.addEventListener('click', showShipForm);
        randomSelection.addEventListener('click', generateRandom);
        cancelFormButton.addEventListener('click', resetGrid);
        submitButton.addEventListener('click', addShipToGrid);
        
    }

    return {initialize};

})();

export default domHandler;