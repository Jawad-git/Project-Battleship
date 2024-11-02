function Gameboard (size = 10)
{
    if (size > 20 || size < 5)
    {
        throw new Error('Exception: gameboard size must be between 5 and 20');
    }
    const grid = Array.from({length: size}, () => Array(size).fill(null))
    const ships = [];
    
    const placeShip = (ship, x , y, orientation = "horizontal") =>
    {
        if (x < 0 || y < 0 || x >= size || y >= size)
        {
            throw new Error
            ('Exception: the coordinates must me inside the gameboard');
        }
        if (orientation == "horizontal")
        {
            if (y + ship.length >= size)
            {
                throw new Error
                ('Exception: The ship must fit within the gameboard');
            }
            for(let i = y; i < y + ship.length; i++)
            {
                if (grid[x][i] != null)
                {
                    throw new Error
                    ('Exception: The ship cannot be placed over another ship');
                }     
            }
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


    return {grid, ships, placeShip};
}

module.exports = Gameboard;