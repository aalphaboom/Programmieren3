const Creature = require("./creatures/creature");
const Grass = require("./creatures/grass");
const Grazer = require("./creatures/grazer");
const Predator = require("./creatures/predator");
const Mushroom = require("./creatures/mushroom");
const PredatorCannibal = require("./creatures/predatorCannibal");
const random = require("./utils");

const express = require("express");
const app = express();
let server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("./"));
app.get("/", function (req, res) {
    res.redirect("client.html");
})

matrix = [];
let side = 15;
let interval = 1000;

const grassSpawnRate = 7;
const grazerSpawnRate = 9;
const predatorSpawnRate = 10;
const mushroomSpawnRate = 11;

function getRandomMatrix(w, h) {
    let matrix = [];

    for (let i = 0; i < w; i++) {
        matrix[i] = [];

        for (j = 0; j < h; j++) {
            key = Math.floor(Math.random() * 12);
            if (key == 1 || key == 2) {
                matrix[i][j] = 0;
            } else if (key <= grassSpawnRate) {
                matrix[i][j] = 1;
            } else if (key <= grazerSpawnRate && key > grassSpawnRate) {
                matrix[i][j] = 2;
            } else if (key == predatorSpawnRate) {
                matrix[i][j] = 3;
            } else if (key == mushroomSpawnRate) {
                matrix[i][j] = 5;
            }
        }
    }

    return matrix;
}

grassObjekts = [];
grazerObjekts = [];
predatorObjekts = [];
predatorCannibalObjekts = [];
mushroomObjekts = [];
infectedGrazerObjekts = [];

allNewPredatorBecomesCanibal = false;

let createNewPreadator = false;
let createNewGrazer = false;

weatherRoundCount = 0;
const weathers = ["normal", "normal", "normal", "rainy", "drought"];
currentWeather = null;

function initGame() {
    console.log("Create new game...");
    matrix = getRandomMatrix(50, 50);

    for (let y in matrix) {
        y = parseInt(y);
        for (let x in matrix[y]) {
            x = parseInt(x);
            if (matrix[y][x] == 1) {
                //grass
                grassObjekts.push(new Grass(x, y));
            } else if (matrix[y][x] == 2) {
                // gelb
                let grzObj = new Grazer(x, y);
                grazerObjekts.push(grzObj);
            } else if (matrix[y][x] == 3) {
                // rot
                let prdObj = new Predator(x, y);
                predatorObjekts.push(prdObj);
            } else if (matrix[y][x] == 5) {
                mushroomObjekts.push(new Mushroom(x, y));
            } else if (matrix[y][x] == 6) {
                predatorCannibalObjekts.push(new PredatorCannibal(x, y));
            }
        }
    }

    weatherRoundCount = 0;
    currentWeather = "normal";

    allNewPredatorBecomesCanibal = false;
}



function draw() {
    for (let i = 0; i < grassObjekts.length; i++) {
        if(currentWeather == "drought" && random([0, 1, 2, 3, 4, 5, 6]) == 6)
        {
            grassObjekts.splice(i, 1);
        }else{
            grassObjekts[i].multipliy();
        }
    }

    for(let i = 0; i < mushroomObjekts.length; i++)
    {
        mushroomObjekts[i].live();
    }

    for (let i = 0; i < grazerObjekts.length; i++) {
        grazerObjekts[i].eat();
    }

    for (let i = 0; i < predatorObjekts.length; i++) {
        predatorObjekts[i].eat();
    }

    for (let i = 0; i < predatorCannibalObjekts.length; i++) {
        predatorCannibalObjekts[i].eat();
    }

    for(let i = 0; i < infectedGrazerObjekts.length; i++){
        infectedGrazerObjekts[i].eat();
    }

    if (createNewPreadator) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 0) {
                    if (random([0, 1, 2, 3]) == 3) {
                        if (allNewPredatorBecomesCanibal) {
                            predatorCannibalObjekts.push(new PredatorCannibal(x, y));
                            matrix[y][x] = 6;
                        } else {
                            predatorObjekts.push(new Predator(x, y));
                            matrix[y][x] = 3;
                        }
                    }
                }
            }
        }
        createNewPreadator = false;
    }

    if (createNewGrazer) {
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 0) {
                    if (random([0, 1, 2, 3]) == 3) {
                        grazerObjekts.push(new Grazer(x, y));
                        matrix[y][x] = 2;
                    }
                }
            }
        }
        createNewGrazer = false;
    }

    if (weatherRoundCount == 10) {
        currentWeather = random(weathers);
        console.log("The current wether is: ", currentWeather);
        weatherRoundCount = (-10);
    }
    weatherRoundCount++;
}

////////////////////////////
/// GAME WIRD GESTARTET////
////////////////////////////

server.listen(3000, function () {
    console.log("Server wurde gestartet und hört auf port 3000");
});

io.on("connection", function (socket) {
    console.log("Client connected...", io.engine.clientsCount);

    if (io.engine.clientsCount === 1) {
        initGame();
        gameInterval = setInterval(function () {
            draw();
            io.sockets.emit("init matrix", [matrix, side, interval]);
        }, interval);
    } else {
        socket.emit("send matrix", matrix);
        socket.emit("send matrix sides", side);
    }

    socket.on("kill all", function (a) {
        console.log("Player Input: Kill all");
        grassObjekts = [];
        grazerObjekts = [];
        predatorObjekts = [];
        predatorCannibalObjekts = [];
        mushroomObjekts = [];
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;

            }
        }
    })

    socket.on("all new predator become cannibal", function (a) {
        allNewPredatorBecomesCanibal = true;
        console.log("Player Input: All new predator become cannibal");
    })

    socket.on("create new preadator", function (a) {
        createNewPreadator = true;
        console.log("Player Input: Create new predator");
    });

    socket.on("create new grazer", function(a){
        createNewGrazer = true;
        console.log("Player Input: Create new grazer")
    })
})

