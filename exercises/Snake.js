"use strict";
import context from "../../Scripts/Context.js";
import * as Utils from "../../Scripts/Utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let arraySnakes = [];

setup();
callFunc();

function callFunc() {
    arraySnakes[0].drawBack();
    arraySnakes[0].snake();
    arraySnakes[0].apple();
    arraySnakes[0].text();
    document.onkeydown = MoveSnake;
}

function setup() {
    let objectSnake = {
        xSnake: 0,
        ySnake: 300,
        xApple: 125, // Utils.randomNumber(0, width),
        yApple: 330, // Utils.randomNumber(0, height),
        h: 100,

        drawBack: function () {
            context.fillStyle = "black";
            context.fillRect(0, 0, width, height);
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    context.strokeStyle = "white";
                    Utils.drawLine(50 + i * 50, 0, 50 + i * 50, height);
                    Utils.drawLine(0, 0 + i * 50, width, 0 + i * 50);
                }
            }
        },
        apple: function () {
            context.fillStyle = "green";
            context.beginPath();
            context.moveTo(this.xApple - 15, this.yApple - 20);
            context.lineTo(this.xApple + 15, this.yApple - 20);
            context.lineTo(this.xApple, this.yApple);
            context.fill();

            context.fillStyle = "red";
            Utils.fillCircle(this.xApple, this.yApple, 15);
        },
        snake: function () {
            context.fillStyle = Utils.hsl(107, 100, 30);
            context.fillRect(0, this.ySnake, 50, 50);
        },
        score: 0,
        amountBlocks: 50,
        level: 1,
        text: function () {
            for (let i = 0; i < arraySnakes.length; i++) {
                let objectSnake = arraySnakes[i];

                context.fillStyle = "#5d5d5d";
                context.fillRect(0, 1, 149, 49);
                context.fillRect(201, 1, 148, 49);
                context.fillRect(451, 1, 148, 49);
                //Text info
                context.fillStyle = "white";
                context.font = "italic 24pt Arial";

                //score
                context.fillText("Score: " + objectSnake.score, 5, 45);
                //Amount blocks
                context.fillText(objectSnake.amountBlocks + " /50", 230, 45);

                //Level
                context.fillText("Level: " + objectSnake.level, 460, 45);
            }
        }
    };
    arraySnakes.push(objectSnake);
}

/**
 * 
 * @param {KeyboardEvent} eventData 
 */
function MoveSnake(eventData) {
    let key = eventData.key;

    for (let i = 0; i < arraySnakes.length; i++) {
        let objectSnake = arraySnakes[i];

        context.fillStyle = Utils.hsl(objectSnake.h, 100, 30);
        context.fillRect(objectSnake.xSnake, objectSnake.ySnake, 50, 50);

        if (key == "ArrowRight") {
            objectSnake.xSnake += 50;
            objectSnake.h += 20;
            objectSnake.amountBlocks -= 1;
        } else if (key == "ArrowLeft") {
            objectSnake.xSnake -= 50;
            objectSnake.h += 20;
            objectSnake.amountBlocks -= 1;
        } else if (key == "ArrowDown") {
            objectSnake.ySnake += 50;
            objectSnake.h += 20;
            objectSnake.amountBlocks -= 1;
        } else if (key == "ArrowUp") {
            objectSnake.ySnake -= 50;
            objectSnake.h += 20;
            objectSnake.amountBlocks -= 1;
        }

        //Score
        if (objectSnake.xSnake - 25 == objectSnake.xApple && objectSnake.ySnake + 30 == objectSnake.yApple) {
            objectSnake.score += 1;
        }

        //RESET
        if (objectSnake.xSnake >= width && objectSnake.amountBlocks > 0) {
            objectSnake.level += 1;
            objectSnake.xSnake = 0;
            objectSnake.amountBlocks = 50;
            callFunc();
        } else if (objectSnake.amountBlocks == 0) {
            objectSnake.amountBlocks = 50;
            objectSnake.xSnake = 0;
            objectSnake.level = 0;
            objectSnake.score = 0;
            callFunc();
        }
        //Text
        arraySnakes[0].text();
    }
}