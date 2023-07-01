const Creature = require("./creature");
const PredatorCannibal = require("./predatorCannibal");
const random = require("../utils");

module.exports = class Predator extends Creature
{
    constructor(x, y)
    {
        super(x, y);

        //Farbe
        this.colorValue = 3;

        this.energy = 0;
        this.notEatenCounter = 0;
    }

    findFields(value)
    {
        this.newDirection();
        return super.findFields(value);
    }

    eat()
    {
        if(this.energy > 3)
        {
            this.multipliy();
        }else{

            let grazerFields = this.findFields(2);

            if(grazerFields.length > 0)
            {
                let randPos = random(grazerFields);
                let newX = randPos[0];
                let newY = randPos[1];

                matrix[newY][newX] = 3;
                matrix[this.y][this.x] = 0;

                this.y = newY;
                this.x = newX;

                for(let i = 0; i < grazerObjekts.length; i++)
                {
                    if(grazerObjekts[i].x == newX && grazerObjekts[i].y == newY)
                    {
                        grazerObjekts.splice(i, 1);
                        this.notEatenCounter = 0;
                        this.energy++;
                        break;
                    }
                }
            }else if(10 == this.notEatenCounter)
            {
                this.die();
            }else
            {      
                this.move();
            }
        }

        this.round_counter = 0; 
    }

    move()
    {
        this.energy = 0;
        this.notEatenCounter++;

        let emptyFields = this.findFields(0);

        if(emptyFields.length > 0)
        {
            let randPos = random(emptyFields);
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = 3;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }
    

    multipliy()
    {
        let emptyFields = this.findFields(0);

        if(emptyFields.length > 0)
        {
            let randPos = random(emptyFields);
            let newX = randPos[0];
            let newY = randPos[1];

            let randomNum = Math.floor(Math.random() * 11);

            if(randomNum <= 4)
            {
                matrix[newY][newX] = 6;
                predatorCannibalObjekts.push(new PredatorCannibal(newX, newY));
            }else
            {
                matrix[newY][newX] = 3;
                predatorObjekts.push(new Predator(newX, newY));
            }

            this.energy = 0;
        }
        
    }

    die()
    {
        matrix[this.y][this.x] = 0;

        for(let i = 0; i < predatorObjekts.length; i++)
        {
            if(this.x == predatorObjekts[i].x && this.y == predatorObjekts[i].y)
            {
                predatorObjekts.splice(i, 1);
            break;
            }
        }
    }
}