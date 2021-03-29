// // import default from module
// import FloodFill from 'q-floodfill'
// // get 2d context
// const context = canvas.getContext('2d')
// // get image data
// const imgData = context.getImageData(0, 0, canvas.width, canvas.height)
// // Construct flood fill instance
// const floodFill = new FloodFill(imgData)
// // Modify image data
// floodFill.fill(fillColor, x, y, 0)
// // put the modified data back in context
// context.putImageData(floodFill.imageData, 0, 0)

window.addEventListener('load', () => {

    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', tool);
});
var rangeWidth = document.getElementById("inputWidth");
var outputWidth = document.getElementById("widthOut");
outputWidth.innerHTML = rangeWidth.value;

var rangeOpacity = document.getElementById("inputOpacity");
var outputOpacity = document.getElementById("opacityOut");
outputOpacity.innerHTML = rangeOpacity.value;

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');
let coord = { x: 0, y: 0 };
let paint = false;
let points = [];
let redoDraw = [];

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function startPainting(event) {
    paint = true;
    getPosition(event);
    lastX = coord.x;
    lastY = coord.y;
    points.push({
        x: coord.x,
        y: coord.y,
        size: document.querySelector('#inputWidth').value,
        color: document.querySelector('#selColor').value,
        mode: "drawing"
    })
}

function tool(event) {
    function type() {
        var radio = document.getElementsByName('tool');
        //console.log(radio);
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                //console.log(radio[i].id);
                return radio[i].id;

            }
        }
    };
    let choice = type();
    //console.log(choice);
    if (choice === "pen") {
        if (!paint) return;
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.lineCap = 'butt';
        ctx.strokeStyle = document.querySelector('#selColor').value;
        ctx.moveTo(coord.x, coord.y);
        ctx.globalAlpha = document.querySelector('#inputOpacity').value / 100;
        getPosition(event);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    } else if (choice === "brush") {
        if (!paint) return;
        ctx.beginPath();
        ctx.lineWidth = document.querySelector('#inputWidth').value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = document.querySelector('#selColor').value;
        ctx.moveTo(coord.x, coord.y);
        ctx.globalAlpha = document.querySelector('#inputOpacity').value / 100;
        getPosition(event);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    } else if (choice === "bucket") {
        if (!paint) return;
        ctx.beginPath();
        ctx.fillStyle = document.querySelector('#selColor').value;
        ctx.fill(region);
        ctx.globalAlpha = document.querySelector('#inputOpacity').value / 100;
    } else if (choice === "eraser") {
        if (!paint) return;
        ctx.beginPath();
        ctx.lineWidth = document.querySelector('#inputWidth').value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#eee';
        ctx.moveTo(coord.x, coord.y);
        ctx.globalAlpha = 1;
        getPosition(event);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();

    } else (console.log("error"))

}
function stopPainting() {
    paint = false;
}

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function undo() {
    var prevPoint = points.pop();
    redoDraw.unshift(prevPoint);
    redrawAll();
}
function redo() {
}
function redrawAll() {
    if (points.length == 0) { return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var begin = false;
        if (ctx.lineWidth != pt.size) {
            ctx.lineWidth = pt.size;
            begin = true;
        }
        if (ctx.strokeStyle != pt.color) {
            ctx.strokeStyle = pt.color;
            begin = true;
        }
        if (pt.mode == "begin" || begin) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
        }
        ctx.lineTo(pt.x, pt.y);
        if (pt.mode == "end" || (i == points.length - 1)) {
            ctx.stroke();
        }
    }
    ctx.stroke();
}