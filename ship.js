function Ship(length)
{
    if (length <= 0 || length > 5) {
        throw new Error("Ship length must be smaller than 6 and greater than 0");
    }
    this.length = length;
    hits = 0;
    sunken = false;
}

Ship.prototype.hit = function()
{
    this.hits++;
    this.isSunk();
}

Ship.prototype.isSunk = function()
{
    if (this.hits == this.length)
    {
        this.sunken = true;
    }
}

module.exports = Ship;