import ship from './ship';
function Gameboard (size = 10)
{
    if (size > 20 || size < 5)
    {
        throw new Error('Exception: gameboard size must be between 5 and 20');
    }
    const grid = Array.from({length: size}, () => Array(size).fill(null))
    let ships = [];
    //let AllShipsSunken = false;
    
    // default orientation is horizontal
    const placeShip = (ship, x , y, orientation = "horizontal") =>
    {
        // if the coordinates are not within grid, throw an error
        if (x < 0 || y < 0 || x >= size || y >= size)
        {
            throw new Error
            ('Exception: the coordinates must me inside the gameboard');
        }

        if (orientation == "horizontal")
        {
            // If the ship oversteps the grid, throw an error
            if (y + ship.length >= size)
            {
                throw new Error
                ('Exception: The ship must fit within the gameboard');
            }
            for(let i = y; i < y + ship.length; i++)
            {
                // if there is already a ship in one of the cells required
                // for the new one, throw an error
                if (grid[x][i] != null)
                {
                    throw new Error
                    ('Exception: The ship cannot be placed over another ship');
                }     
            }
            // if the ship is succesfully placed, place a reference
            // to it in each of the slots it takes
            for(let i = y; i < y + ship.length; i++)
            {
                grid[x][i] = ship;
            }
        }
        else if (orientation == "vertical")
        {
            if (x + ship.length >= size)
            {
                throw new Error
                ('Exception: The ship must fit within the gameboard');
            }
            for(let i = x; i < x + ship.length; i++)
            {
                if (grid[i][y] != null)
                {
                    throw new Error
                    ('Exception: The ship cannot be placed over another ship');
                }
            }
            for(let i = x; i < x + ship.length; i++)
            {
                grid[i][y] = ship;
            }
        }
        ships.push(ship);
    }

    const receiveAttack = (x, y) =>
    {
        // case: position still untouched and there is no ship
        if (grid[x][y] === null) {
            grid[x][y] = "miss";
            return "miss";
        }

        // case: the position has been struck before
        if (grid[x][y] === "miss" || grid[x][y] === "hit"){
            throw new Error('Exception: The attack must be on a' +
            ' new position');
        }

        // case: position still untouched but there is ship
        const ship = grid[x][y];
        ship.hit();
        grid[x][y] = "hit";
        console.log(`Ship status after hit: ${ship.sunken}`);
        return "hit";
    }

    const clearGrid = () =>
    {
        ships.length = 0
        for (let i = 0; i < grid.length; i++) {
            grid[i].fill(null);
        }
    }

    const generateRandomZeroToTen = () =>
    {
        return Math.floor(Math.random() * 10);
    }

    const generateOrientation = () =>
    {
        let orientation = Math.floor(Math.random() * 2);
        return (orientation === 0)? "horizontal": "vertical";
    }

    const placeRandomShip = (length) =>
    {
        try 
        {
            placeShip(new ship(length), generateRandomZeroToTen(), generateRandomZeroToTen(), generateOrientation());
        }
        catch (error)
        {
            placeRandomShip(length);
        }
    }
    const generateRandom = () =>
    {
        placeRandomShip(4);
        placeRandomShip(3);
        placeRandomShip(3);
        placeRandomShip(2);
        placeRandomShip(2);
        placeRandomShip(2);
        placeRandomShip(1);
        placeRandomShip(1);
        placeRandomShip(1);
    }

    // review why AllShipsSunken, ships.filter(x => x !== ship)
    // with ships.length === 0 then AllShipsSunken = true doesn't work
    
    const getAllShipsSunken = () => ships.every(ship => ship.sunken);

    return {grid, ships, placeShip, receiveAttack, clearGrid, generateRandom, get AllShipsSunken() {
        return getAllShipsSunken();
    }};
}

module.exports = Gameboard;