const Creature = require("./creature");
const random = require("../utils");

module.exports = class Mushroom extends Creature
{
    constructor(x, y)
    {
        super(x, y);

        //Farbe
        this.colorValue = 5;
    }

    toBeEaten(i)
    {
        matrix[grazerObjekts[i].y][grazerObjekts[i].x] = 0;
        grazerObjekts.splice(i, 1);

        for(let j = 0; j < mushroomObjekts.length; j++)
        {
            if(mushroomObjekts[j].x == this.x && mushroomObjekts[j].y == this.y)
            {
                matrix[mushroomObjekts[j].y][mushroomObjekts[j].x] = 0;
                mushroomObjekts.splice(j, 1);
            }
        }
    }
}