const Creature = require("./creatures/creature");
const Grass = require("./creatures/grass");
const Grazer = require("./creatures/grazer");
const Predator = require("./creatures/predator");
const Mushroom = require("./creatures/mushroom");
const PredatorCannibal = require("./creatures/predatorCannibal");
const random = require("./utils");


matrix = [];

const grassSpawnRate = 7;
const grazerSpawnRate = 9;
const predatorSpawnRate = 10;
const mushroomSpawnRate = 11;

function getRandomMatrix(w, h)
{
    let matrix = [];

    for(let i = 0; i < w; i++)
    {
        matrix[i] = [];

        for(j = 0; j < h; j++)
        {
            key = Math.floor(Math.random() * 12);
            if(key == 1 || key == 2)
            {
                matrix[i][j] = 0;
            }else if(key <= grassSpawnRate)
            {
                matrix[i][j] = 1;
            }else if(key <= grazerSpawnRate && key > grassSpawnRate)
            {
                matrix[i][j] = 2;
            }else if(key == predatorSpawnRate)
            {
                matrix[i][j] = 3;
            }else if(key == mushroomSpawnRate)
            {
                matrix[i][j] = 5;
            }
        }
    }

    return matrix;
}
let side = 15;

grassObjekts = [];
grazerObjekts = [];
predatorObjekts = [];
predatorCannibalObjekts = [];
mushroomObjekts = [];

function initGame()
{
    matrix = getRandomMatrix(4, 6);

    for(let y in matrix){
        y = parseInt(y);
        for(let x in matrix[y]){
            x = parseInt(x);
            if(matrix[y][x] == 1){
                //grass
                grassObjekts.push(new Grass(x, y));
            }else if(matrix[y][x] == 2){
                // gelb
                let grzObj = new Grazer(x, y);
                grazerObjekts.push(grzObj);
            }else if(matrix[y][x] == 3){
                // rot
                let prdObj = new Predator(x, y);
                predatorObjekts.push(prdObj);
            }else if(matrix[y][x] == 5)
            {
                mushroomObjekts.push(new Mushroom(x, y));
            }else if(matrix[y][x] == 6)
            {
                predatorCannibalObjekts.push(new PredatorCannibal(x, y));
            }
        }
    }
}



function draw()
{
    for(let i = 0; i < grassObjekts.length; i++)
    {
        grassObjekts[i].multipliy();
    }

    for(let i = 0; i < grazerObjekts.length; i++)
    {
        grazerObjekts[i].eat();
    }

    for(let i = 0; i < predatorObjekts.length; i++)
    {
        predatorObjekts[i].eat();
    }

    for(let i = 0; i < predatorCannibalObjekts.length; i++)
    {
        predatorCannibalObjekts[i].eat();
    }

    for(let y = 0; y < matrix.length; y++)
    {
        for(let x = 0; x < matrix[y].length; x++)
        {
            console.log(matrix);
        }
    }
}

////////////////////////////
/// GAME WIRD GESTARTET////
////////////////////////////

initGame();
setInterval(draw, 400);