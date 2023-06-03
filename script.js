/*
    Meine Figuren:

    Pilz:
    - Braune Farbe
    - Kann von einem Grass Fresser gefressen werden
    - Grass Fresser bevorzugen Grass aber falls es keins gibt essen Grass Fresser auch Pilze
    - Falls ein Grass Fresser ein Pilz frisst, stirbt der Grass Fresser

    Fleischfresser Kannibale:
    - Dunkel Rote Farbe
    - Bei einer Vermehrung von Fleischfressern gibt es eine Chance von 40% das ein Kannibale zur Welt kommt
    - Ein Fleischfresser Kannibale isst nicht nur Grass Fresser sondern auch andere Fleischfresser
    - Falls sich ein Kannibale vermehrt, ist die Chance das ein neuer Kannibale zur Welt kommt 50%

*/

// Bitte ladet mein Abschlussprojekt fuer mich auf TUMO-World hoch


let matrix = [];

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
            key = Math.round(random(0, 11));
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

let grassObjekts = [];
let grazerObjekts = [];
let predatorObjekts = [];
let predatorCannibalObjekts = [];
let mushroomObjekts = [];

function setup()
{
    matrix = getRandomMatrix(45, 45);
    frameRate(13);
    createCanvas((side * matrix[0].length)+ 1, (side * matrix.length)+ 1);
    background("#acacac");

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

    for(let y in matrix){
        y = parseInt(y);
        for(let x in matrix[y]){
            x = parseInt(x);
            fill('#ffffff');
            if(matrix[y][x] == 1)
            {
                //grün
                fill('green');
            }else if(matrix[y][x] == 2)
            {
                // gelb
                fill('yellow');
            }else if(matrix[y][x] == 3)
            {
                // rot
                fill('red');
            }else if(matrix[y][x] == 4)
            {
                // orange
                fill('orange')
            }else if(matrix[y][x] == 5)
            {
                // braun
                fill('#915e17');
            }else if(matrix[y][x] == 6)
            {
                // dunkles rot
                fill('#690303')
            }
            rect(x * side, y * side, side, side);     
        }
    }
}