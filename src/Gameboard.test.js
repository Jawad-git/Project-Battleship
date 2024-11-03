const Gameboard = require('./Gameboard');
const Ship = require('./ship');
describe('Gameboard and Ship Tests', () => {
    let shipLength3;
    let shipLength5;
    let gameboard;

    beforeAll(() => {
        shipLength3 = new Ship(3); // Assuming Ship has a length parameter
        shipLength5 = new Ship(5); // Assuming Ship has a length parameter
    });

    beforeEach(() => {
        gameboard = Gameboard();
    });

    // gameboard instantiation tests

    test('The gameboard constructor creates an instance: ', () =>
    {
        expect(gameboard).toHaveProperty('grid'); // Check if it has a grid property
        expect(gameboard).toHaveProperty('ships'); // Check if it has a ships property
    });

    test('A gameboard size greater than 20 throws an Exception: ', () =>
    {
        expect(() => Gameboard(24)).toThrow
        ('Exception: gameboard size must be between 5 and 20');
    });

    test('A gameboard size smaller than 5 throws an Exception: ', () =>
    {
        expect(() => Gameboard(3)).toThrow
        ('Exception: gameboard size must be between 5 and 20');
    });

    // gameboard placeShip method tests

    test('The gameboard place ship method works correctly: ', () =>
    {
        gameboard.placeShip(shipLength3, 3, 3);
        expect(gameboard.grid[3][3]).toEqual(shipLength3);
        expect(gameboard.grid[3][4]).toEqual(shipLength3);
        expect(gameboard.grid[3][5]).toEqual(shipLength3);
    });


    test('Placing a ship over another throws an error: ', () =>
    {
        gameboard.placeShip(shipLength3, 3, 3);
        gameboard.placeShip(shipLength3, 4, 4, "vertical");
        expect(() => gameboard.placeShip(new Ship(5), 3, 0)).toThrow(
        'Exception: The ship cannot be placed over another ship');
        expect(() => gameboard.placeShip(new Ship(5), 4, 4, "vertical")).toThrow(
        'Exception: The ship cannot be placed over another ship');

    });


    test('Placing a ship overboard throws an error: ', () =>
    {
        expect(() => gameboard.placeShip(shipLength3, 3, 8)).toThrow(
        'Exception: The ship must fit within the gameboard');
        expect(() => gameboard.placeShip(shipLength5, 5, 2, "vertical")).toThrow(
        'Exception: The ship must fit within the gameboard');
    });

    test('Placing a ship out of grid bound throws an error: ', () =>
    {
        expect(() => gameboard.placeShip(shipLength3, 10, 5)).toThrow(
        'Exception: the coordinates must me inside the gameboard');
        expect(() => gameboard.placeShip(shipLength3, 4, 12)).toThrow(
        'Exception: the coordinates must me inside the gameboard');
    });

    // gameboard receiveAttack method tests:

    test('receiveAttack() works and method hit() registers on ship: ', () =>
    {
        let ship = new Ship(3);
        gameboard.placeShip(ship, 2, 3);
        gameboard.receiveAttack(2, 3);
        gameboard.receiveAttack(2, 4);
        gameboard.receiveAttack(2, 5);
        expect(ship.hits).toBe(3);
    });

    test('receiveAttack() on coordinates with no ship produces a "miss": ', () =>
    {
        gameboard.receiveAttack(2, 3);
        expect(gameboard.grid[2][3]).toBe('miss');
    });

    test('receiveAttack() on coordinates with a ship produces a "hit": ', () =>
    {
        gameboard.placeShip(new Ship(2), 2, 3);
        gameboard.receiveAttack(2, 3);
        expect(gameboard.grid[2][3]).toBe('hit');
    });

    test('receiveAttack() on already targeted coordinates throws an error: ', () =>
    {
        gameboard.placeShip(new Ship(2), 2, 3);
        gameboard.receiveAttack(2, 3);
        gameboard.receiveAttack(2, 2);
        expect(() => gameboard.receiveAttack(2, 3)).toThrow(
        'Exception: The attack must be on a new position');
        expect(() => gameboard.receiveAttack(2, 2)).toThrow(
        'Exception: The attack must be on a new position');
    });

    test('sinking all the ships updates AllShipsSunken to true', () =>
    {
        gameboard.placeShip(new Ship(1), 0, 0);
        gameboard.placeShip(new Ship(1), 1, 1);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 1);
        expect(gameboard.AllShipsSunken).toBe(true);
    });

});
