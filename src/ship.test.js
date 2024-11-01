const Ship = require('./Ship');

test('The ship constructor creates a ship with specified length: ', () =>
{
    let ship = new Ship(3);
    expect(ship.length).toBe(3);
});

test('The ship constructor throws an error if length > 5: ', () =>
{
    expect(() => new Ship(6)).toThrow
    ('Exception: the length must be smaller than 6 & larger than 0');
});

test('The ship constructor throws an error if length < 0: ', () =>
{
    expect(() => new Ship(0)).toThrow
    ('Exception: the length must be smaller than 6 & larger than 0');
});

test('The function "hits()" works & registers: ', () =>
{
    let ship = new Ship(5);
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(2);
});
