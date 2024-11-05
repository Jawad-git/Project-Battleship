function Ship(length)
{
    // throw an error if ship is longer than 5
    // or is 0/negative
    if (length <= 0 || length > 5) {
        throw new Error("Exception: the length must be smaller than 6 & larger than 0");
    }
    this.length = length;
    this.hits = 0;
    this.sunken = false;
}

Ship.prototype.hit = function()
{
    this.hits += 1;
    if (this.hits >= this.length)
    {
            this.sunken = true;
    }
}

module.exports = Ship;