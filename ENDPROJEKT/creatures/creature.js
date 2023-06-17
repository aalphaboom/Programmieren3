const random = require("../utils");
module.exports = class Creature
{
    constructor(x, y)
    {
        //Poition
        this.x = x;
        this.y = y;

        //Runde
        this.round_counter = 0;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    newDirection()
    {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x,     this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(value)
    {
        this.newDirection();
        let found = [];

        for(let i = 0; i < this.directions.length; i++)
        {
            i = parseInt(i);

            let posArr = this.directions[i];

            let posX = posArr[0];
            let posY = posArr[1];

            if(posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length)
            {
                let matrixValue = matrix[posY][posX];

                if(matrixValue == value)
                {
                    found.push(posArr);
                }
            }
            
            
        }
        return found;
    }
}