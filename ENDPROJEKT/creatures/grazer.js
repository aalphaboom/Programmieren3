const Creature = require("./creature");
const random = require("../utils");
const Mushroom = require("./mushroom");

module.exports = class Grazer extends Creature
{
    constructor(x, y)
    {
        super(x, y);

        //Farbe
        this.colorValue = 2;

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
        let grassFields = this.findFields(1);
        let mushroomFields = this.findFields(5);

        if(this.energy > 4 && grassFields.length < 7)
        {
            this.multipliy();
        }else if(grassFields.length > 0)
        {
            let randPos = random(grassFields);
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.y = newY;
            this.x = newX;

            for(let i = 0; i < grassObjekts.length; i++)
            {
                if(grassObjekts[i].x == newX && grassObjekts[i].y == newY)
                {
                    grassObjekts.splice(i, 1);
                    this.notEatenCounter = 0;
                    this.energy++;
                    break;
                }
            }
        }else if(mushroomFields.length > 0)
        {
            let randPos =  Math.random(mushroomFields);
            let newX = randPos[0];
            let newY = randPos[1];

            for(let i = 0; i < mushroomObjekts.length; i++)
            {
                if(mushroomObjekts[i].x == newX && mushroomObjekts[i].y == newY)
                {
                    for(let k = 0; k < grazerObjekts.length; k++)
                    {
                        if(grazerObjekts[k].x == this.x && grazerObjekts[k].y == this.y)
                        {
                            mushroomObjekts[i].toBeEaten(k);
                            break;
                        }
                    }
                }
            }

        }else if(4 == this.notEatenCounter)
        {
            this.die();
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

            matrix[newY][newX] = 2;

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

            matrix[newY][newX] = 2;

            let grzObj = new Grazer(newX, newY);
            grazerObjekts.push(grzObj);

            this.energy = 0;
        }
    }

    die()
    {
        matrix[this.y][this.x] = 0;

        for(let i = 0; i < grazerObjekts.length; i++)
        {
            if(this.x == grazerObjekts[i].x && this.y == grazerObjekts[i].y)
            {
                grazerObjekts.splice(i, 1);
            break;
            }
        }
    }
}