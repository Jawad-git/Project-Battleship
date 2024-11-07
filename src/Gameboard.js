import ship from './ship';
function Gameboard (size = 10)
{
    if (size > 20 || size < 5)
    {
        throw new Error('Exception: gameboard size must be between 5 and 20');
    }
    const grid = Array.from({length: size}, () => Array(size).fill(null))
    let ships = [];
    let occupiedCoordinates = [];
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
                occupiedCoordinates += [x, i];
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
                occupiedCoordinates += [i, y];
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
        grid[x][y] = "hit"; // is this still necessary?
        console.log(`Ship status after hit: ${ship.sunken}`);
        return "hit";
    }

    // reset the gameboard
    const clearGrid = () =>
    {
        occupiedCoordinates = [];
        ships.length = 0
        for (let i = 0; i < grid.length; i++) {
            grid[i].fill(null);
        }
    }

    // generate random position from one end to another in the
    // gameboard linearly. Assume the length is 10
    // MAY WANT TO ACCOUNT FOR IT DYNAMICALLY LATER ON
    const generateRandomZeroToNine = () =>
    {
        return Math.floor(Math.random() * 10);
    }

    // generate orientation of the ship, in a 50/50 fashion.
    const generateOrientation = () =>
    {
        let orientation = Math.floor(Math.random() * 2);
        return (orientation === 0)? "horizontal": "vertical";
    }

    // place a random sized ship (1 to 5) in a randomly
    // generated position.
    const placeRandomShip = (length) =>
    {
        try 
        {
            placeShip(new ship(length), generateRandomZeroToNine(), generateRandomZeroToNine(), generateOrientation());
        }
        // if there is an error, (out of bounds / ship overlap etc..)
        // simply run it again recursively.
        catch (error)
        {
            placeRandomShip(length);
        }
    }
    // function to randomly generate a gameboard, the game assumes
    // the sizes will assumably go 4/3/3/2/2/2/1/1/1/1
    // MAY WANT TO ACCOUNT FOR CUSTOM SIZES LATER ON.
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
        placeRandomShip(1);
    }

    // fn to check if all the ships have been fully sunk - has a getter
    // review why AllShipsSunken, ships.filter(x => x !== ship)
    // with ships.length === 0 then AllShipsSunken = true doesn't work
    
    const getAllShipsSunken = () => ships.every(ship => ship.sunken);

    return {grid, ships, placeShip, receiveAttack, clearGrid, generateRandom, get AllShipsSunken() {
        return getAllShipsSunken();
    }};
}

module.exports = Gameboard;