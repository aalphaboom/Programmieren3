const Creature = require("./creature");
const random = require("../utils");   

module.exports = class Grass extends Creature
{
    constructor(x, y)
    {
        super(x, y);
        this.colorValue = 1;
    }

    multipliy()
    {
        this.round_counter++;

        if(this.round_counter > 4)
        {
            let emptyFields = this.findFields(0);

            if(emptyFields.length > 0)
            {
                let randPos = random(emptyFields);
                let newX = randPos[0];
                let newY = randPos[1];

                matrix[newY][newX] = 1;

                let grObj = new Grass(newX, newY);
                grassObjekts.push(grObj);
            }
            this.round_counter = 0;
        }
    }
}