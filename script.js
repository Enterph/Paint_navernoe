let canvas = document.querySelector('#canvas')
canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.6;
let ctx = canvas.getContext("2d");
let isd = false;
let color = "#000000"
let tool;
let size = "5px";
let lastcX;
let lastcY;
let clr = document.querySelector("#color input");
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
let line = document.querySelector("#line");
document.getElementById("line").addEventListener("click", function () {
    tool = "line";
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = size
});
function gc(event){
    const rect = canvas.getBoundingClientRect();
    if (event.touches && event.touches.length > 0) {
        return {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }
      }
}
function startDraw(event) {
    const rect = canvas.getBoundingClientRect();
    if (!isd) {
        isd = true;
    }
    ctx.beginPath();
    ctx.moveTo(gc(event).x, gc(event).y);
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
canvas.addEventListener("pointerdown", startDraw)
function endDraw(event) {
    if (isd) {
        if (tool=="line") {
            ctx.lineTo(lastcX, lastcY)
            ctx.strokeStyle = color;
            ctx.stroke()
            isd = false;
        }
        else{
            isd = false;
        }
    }
}
function endDrawWF(event) {
    if (isd) {
        isd = false;
        ctx.lineTo(lastcX, lastcY)
        ctx.strokeStyle = color;
        ctx.stroke()
    }
}
canvas.addEventListener("pointerup", endDraw)
function draw(event) {
    if ((isd) && ((tool=="pen")) || (tool=="eraser")){
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(gc(event).x, gc(event).y)
        ctx.strokeStyle = color;
        ctx.stroke()
    }
    else{
        lastcX = gc(event).x;
        lastcY = gc(event).y;
    }

}
function drawWF(event) {
    if (isd ){
        const rect = canvas.getBoundingClientRect();
        lastcX = gc(event).x;
        lastcY = gc(event).y;
        // ctx.lineTo(gc(event).x, gc(event).y)
        // ctx.strokeStyle = color;
        // ctx.stroke()
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
canvas.addEventListener("pointermove", draw)
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
    var el = document.getElementById("canvas");
    el.addEventListener("pointerdown", startDraw);
    el.addEventListener("pointerup", endDraw);
    el.addEventListener("pointercancel", endDraw);
    el.addEventListener("pointermove", draw);
}