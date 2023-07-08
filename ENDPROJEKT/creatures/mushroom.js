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

    live()
    {
        
        if(currentWeather == "drought" && random([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]) == 5){
            matrix[this.y][this.x] = 0

            for(let i; i < mushroomObjekts.length; i++)
            {
                if(mushroomObjekts[i].x == this.x && mushroomObjekts[i].y == this.y)
                {
                    mushroomObjekts.splice(i, 1);
                    break;
                }
            }
        }
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