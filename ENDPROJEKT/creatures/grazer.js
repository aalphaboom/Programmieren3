const Creature = require("./creature");
const random = require("../utils");
const Mushroom = require("./mushroom");
const InfectedGrazer = require("./infectedGrazer");

module.exports = class Grazer extends Creature {
    constructor(x, y) {
        super(x, y);

        //Farbe
        this.colorValue = 2;

        this.energy = 0;
        this.notEatenCounter = 0;

        this.propagationSpeed = 3;

    }

    findFields(value) {
        this.newDirection();
        return super.findFields(value);
    }


    eat() {

        if (random([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]) == 20) {
            this.becomeInfected();
        } else {


            let infectedGrazerFields = this.findFields(7)

            if (infectedGrazerFields > 0) {
                if (random([1, 2, 3, 4, 5, 6, 7]) == 3) {
                    this.becomeInfected();
                }
            } else {


                let grassFields = this.findFields(1);
                let emptyFields = this.findFields(0);
                let mushroomFields = this.findFields(5);

                if (currentWeather == "normal" || currentWeather == "drought") {
                    this.propagationSpeed = 3;
                } else {
                    this.propagationSpeed = 5;
                }

                if (this.energy > this.propagationSpeed && emptyFields.length > 0) {
                    this.multipliy();
                } else if (grassFields.length > 0) {

                    this.energy += 1
                    let randPos = random(grassFields);
                    let newX = randPos[0];
                    let newY = randPos[1];

                    matrix[newY][newX] = 2;
                    matrix[this.y][this.x] = 0;

                    this.y = newY;
                    this.x = newX;

                    for (let i = 0; i < grassObjekts.length; i++) {
                        if (grassObjekts[i].x == newX && grassObjekts[i].y == newY) {
                            grassObjekts.splice(i, 1);
                            break;
                        }
                    }

                    this.notEatenCounter = 0;

                } else if (mushroomFields.length > 0) {
                    let randPos = random(mushroomFields);
                    let newX = randPos[0];
                    let newY = randPos[1];

                    for (let i = 0; i < mushroomObjekts.length; i++) {
                        if (mushroomObjekts[i].x == newX && mushroomObjekts[i].y == newY) {
                            for (let k = 0; k < grazerObjekts.length; k++) {
                                if (grazerObjekts[k].x == this.x && grazerObjekts[k].y == this.y) {
                                    mushroomObjekts[i].toBeEaten(k);
                                    break;
                                }
                            }
                        }
                    }

                } else if (4 == this.notEatenCounter) {
                    this.die();
                } else {
                    this.move();
                }

                this.round_counter = 0;

            }
        }
    }

    move() {

        this.energy = 0;
        this.notEatenCounter++;

        let emptyFields = this.findFields(0);

        if (emptyFields.length > 0) {
            let randPos = random(emptyFields);
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = 2;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }


    multipliy() {

        let emptyFields = this.findFields(0);
        if (emptyFields.length > 0) {


            let randPos = random(emptyFields);
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = 2;

            let grzObj = new Grazer(newX, newY);
            grazerObjekts.push(grzObj);

            this.energy = 0;
        }

    }

    die() {
        matrix[this.y][this.x] = 0;

        for (let i = 0; i < grazerObjekts.length; i++) {
            if (this.x == grazerObjekts[i].x && this.y == grazerObjekts[i].y) {
                grazerObjekts.splice(i, 1);
                break;
            }
        }
    }

    becomeInfected() {
        matrix[this.y][this.x] = 7;

        infectedGrazerObjekts.push(new InfectedGrazer(this.x, this.y));

        for (let i = 0; i < grazerObjekts.length; i++) {
            if (this.x == grazerObjekts[i].x && this.y == grazerObjekts[i].y) {
                grazerObjekts.splice(i, 1);
                break;
            }
        }
    }
}