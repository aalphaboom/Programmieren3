matrix = [];
let side;

function main()
{
    console.log("main is executed");
    const socket = io();

    socket.on("send matrix", function(newMatrix)
    {
        matrix = newMatrix;
        console.log(matrix);
        socket.emit("new matrix request", 1);
    });
    
    socket.on("send matrix sides", function(matrixSide){
        side = matrixSide; 
        resizeCanvas((side * matrix[0].length)+ 1, (side * matrix.length)+ 1);
    });
}

main();

function setup()
{
    createCanvas(500, 500);
    background("#acacac");
    frameRate()
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
                fill('#690303')
            }
            rect(x * side, y * side, side, side);     
        }
    }
}

