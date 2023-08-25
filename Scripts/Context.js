"use strict";
/**@type {CanvasRenderingContext2D} */
let context;

getCanvasContext();

export default context;

function getCanvasContext() {
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext('2d');
}