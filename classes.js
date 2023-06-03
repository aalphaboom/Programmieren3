class Grass 
{
    constructor(x, y)
    {
        //Poition
        this.x = x;
        this.y = y;

        //Farbe
        this.colorValue = 1;

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

    findFields()
    {

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

                if(matrixValue == 0)
                {
                    found.push(posArr);
                }
            }
            
            
        }
        return found;  
    }

    multipliy()
    {
        this.round_counter++;

        if(this.round_counter > 4)
        {
            let emptyFields = this.findFields();

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

class Grazer
{
    constructor(x, y)
    {
        //Poition
        this.x = x;
        this.y = y;

        //Farbe
        this.colorValue = 2;


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

        this.energy = 0;
        this.notEatenCounter = 0;

        this.round_counter = 0;
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
            let randPos = random(mushroomFields);
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

class Predator
{
    constructor(x, y)
    {
        //Poition
        this.x = x;
        this.y = y;

        //Farbe
        this.colorValue = 3;


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

        this.energy = 0;
        this.notEatenCounter = 0;

        this.round_counter = 0;
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

            let randomNum = Math.round(random(0, 10));

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

class Mushroom
{
    constructor(x, y)
    {
        //Poition
        this.x = x;
        this.y = y;

        //Farbe
        this.colorValue = 5;

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

class PredatorCannibal
{
    constructor(x, y)
    {
        //Poition
        this.x = x;
        this.y = y;

        //Farbe
        this.colorValue = 6;


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

        this.energy = 0;
        this.notEatenCounter = 0;

        this.round_counter = 0;
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

            let randomNum = Math.round(random(0, 10));

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
