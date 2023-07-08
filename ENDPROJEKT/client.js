matrix = [];
let side;
let interval;

function main()
{
    console.log("main is executed");
    const socket = io();

    socket.on("send matrix", function(newMatrix)
    {
        matrix = newMatrix;
    });
    
    socket.on("init matrix", function(matrixData){
        side = matrixData[1];
        matrix = matrixData[0];
        resizeCanvas((side * matrix[0].length)+ 1, (side * matrix.length)+ 1);
        interval = matrixData[2];
    });

    function killAll()
    {
        //alert("Kaufen sie die Premium Version für 99.99€ um dieses Ereigniss zu nutzen!");
        socket.emit("kill all", null);
        console.log("trying to kill all");
    }
    let killAllButton = document.getElementById("killAllButton");
    killAllButton.onclick = killAll;

    function newPredatorBecomesCannibal()
    {
        socket.emit("all new predator become cannibal", null)
    }
    let newPreadatorBecomeCannibalsButton = document.getElementById("newPreadatorBecomeCannibalsButton");
    newPreadatorBecomeCannibalsButton.onclick = newPredatorBecomesCannibal;


    function createNewPreadator()
    {
        socket.emit("create new preadator", null);
    }
    let createNewPreadatorButton = document.getElementById("createNewPreadatorButton");
    createNewPreadatorButton.onclick = createNewPreadator;


    function createNewGrazer()
    {
        socket.emit("create new grazer", null);
    }
    let createNewGrazerButton = document.getElementById("createNewGrazerButton");
    createNewGrazerButton.onclick = createNewGrazer;
}

main();


function setup()
{
    createCanvas(500, 500);
    background("#acacac");
}

function draw()
{
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
                fill('#690303');
            }else if(matrix[y][x] == 7)
            {
                // Zwischen gelb und grün
                fill("#cfff6e");
            }
            rect(x * side, y * side, side, side);     
        }
    }
}

