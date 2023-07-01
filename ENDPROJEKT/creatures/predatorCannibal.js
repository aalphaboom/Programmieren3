const Creature = require("./creature");
const random = require("../utils");
const Predator = require("./predator");

module.exports = class PredatorCannibal extends Creature
{
    constructor(x, y)
    {
        super(x, y);

        //Farbe
        this.colorValue = 6;

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
        let grazerFields = this.findFields(2);
        let predatorFields = this.findFields(3);

        if(grazerFields.length > 0)
        {
            let randPos = random(grazerFields);
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = 2;
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
        }else if(predatorFields.length > 0)
        {
            let randPos = random(predatorFields);
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;

            this.y = newY;
            this.x = newX;

            for(let i = 0; i < predatorObjekts.length; i++)
            {
                if(predatorObjekts[i].x == newX && predatorObjekts[i].y == newY)
                {
                    predatorObjekts.splice(i, 1);
                    this.notEatenCounter = 0;
                    this.energy++;
                    break;
                }
            }
        }else if(10 == this.notEatenCounter)
        {
                this.die();
        }else if(this.energy == 5)
        {
            this.multipliy();
        }else
        {      
            this.move();
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

            matrix[newY][newX] = 6;

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

            if(randomNum <= 5)
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

        for(let i = 0; i < predatorCannibalObjekts.length; i++)
        {
            if(this.x == predatorCannibalObjekts[i].x && this.y == predatorCannibalObjekts[i].y)
            {
                predatorCannibalObjekts.splice(i, 1);
            break;
            }
        }
    }
}