"use strict";
import context from "../../Scripts/Context.js";
import * as Utils from "../../Scripts/Utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let arraySnakes = [];

setup();
callFunc();

function callFunc() {
    for (let i = 0; i < arraySnakes.length; i++) {
        arraySnakes[i].drawBack();
        arraySnakes[i].snake();
        arraySnakes[i].apple();
    }
}

function setup() {
    for (let i = 0; i < 1; i++) {
        let objectSnake = {
            xSnake: 0,
            ySnake: 300,
            xApple: 125,
            yApple: 330,
            // xApple: Utils.randomNumber(0, width),
            // yApple: Utils.randomNumber(0, height),
            drawBack: function () {
                context.fillStyle = "black";
                context.fillRect(0, 0, width, height);
                for (let i = 0; i < width; i++) {
                    for (let j = 0; j < height; j++) {
                        context.strokeStyle = "white";
                        Utils.drawLine(50 + i * 50, 0, 50 + i * 50, height);
                        Utils.drawLine(0, 50 + i * 50, width, 50 + i * 50);
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
            }
        };
        arraySnakes.push(objectSnake);
    }
}