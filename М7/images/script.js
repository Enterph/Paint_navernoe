let canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.6;
let ctx = canvas.getContext("2d");
let isd = false;
let color = "#000000"
let tool;
let size;
let clr = document.querySelector("#color input")
function chco(){
    color = this.value;
    ctx.strokestyle = color;
}
clr.addEventListener("change", chco)
let pen = document.querySelector("#pen");
document.getElementById("pen").addEventListener("click", function () {
    tool = "pen";
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
});
let eraser = document.querySelector("#eraser");
document.getElementById("eraser").addEventListener("click", function () {
    tool = "eraser";
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
});
function startDraw(event) {
    if (!isd) {
        isd = true;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}
// function startErase(event) {
//     if (!isd) {
//         isd = true;
//     }
//     ctx.beginPath();
//     ctx.moveTo(event.offsetX, event.offsetY);
// }
// canvas.addEventListener("mousedown", function(){
//     if (tool == "pen") {
//         startDraw;
//     }
//     else if (tool == "eraser") {
//         startErase;
//     }
// })
canvas.addEventListener("mousedown", startDraw)
function endDraw(event) {
    if (isd) {
        isd = false;
    }
}
canvas.addEventListener("mouseup", endDraw)
function draw(event) {
    if (isd ){
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.strokeStyle = color;
        ctx.stroke()
    }
}
// function erase(event) {
//     if (isd ){
//         ctx.lineTo(event.offsetX, event.offsetY)
//         ctx.stroke()
//     }
// }
// canvas.addEventListener("mousemove", function(){
//     if (tool == "pen") {
//         console.log(isd)
//         draw;
//     }
//     else if (tool == "eraser") {
//         erase;
//     }
// })
canvas.addEventListener("mousemove", draw)
let trash = document.querySelector("#trashbin");
trash.addEventListener("click", function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let download = document.querySelector("#download");
download.addEventListener("click", function(){
    let link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click()
})

let weight = document.querySelector("#weight")
function cw(){
    size = this.value;
    ctx.lineWidth = size;
}
weight.addEventListener("change", cw)
// Телефон
let media = window.matchMedia("(min-width: 300px) and (max-width: 500px)")
if (media.matches){
    canvas.width = window.innerWidth*0.8;
    canvas.height = window.innerHeight*0.4;
    canvas.addEventListener("touchstart", startDraw)
    canvas.addEventListener("touchend", endDraw)
    canvas.addEventListener("touchmove", draw)
    
}