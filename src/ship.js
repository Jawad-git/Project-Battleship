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

// increment the ship hit counter when a hit method is called.
// if the hits equal the length, change its sunken status to true.
Ship.prototype.hit = function()
{
    this.hits += 1;
    if (this.hits >= this.length)
    {
            this.sunken = true;
    }
}

export default Ship;