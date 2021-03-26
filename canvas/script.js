window.addEventListener('load', () => {

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');
let coord = { x: 0, y: 0 };
let paint = false;

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function startPainting(event) {
    paint = true;
    getPosition(event);
    draw(event);
}
function draw() {
    type = () => {
        var radio = document.getElementsByName('tool');
        console.log(radio);
        for (var i = 0; i < radio.length; i++) {
            radio[i].onclick = () => {
                let choice = this.id;
                console.log(choice);
            }
        }
    };
    let choice = type();
    let size = parseInt(document.querySelector("#inputWidth").value);
    let color = document.querySelector("#selColor").value;
    let opacity = parseInt(document.querySelector("#inputOpacity").value);
    //let stroke = parseInt(document.querySelector("#inputStorke").value);
    let flow = parseInt(document.querySelector("#inputFlow").value);

    if (choice = "pen") {
        ctx.lineWidth = 3;
        ctx.lineCap = "butt";
        ctx.strokeStyle = color;
    } else if (choice ="brush") {
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
    } else if (choice ="bucket") {
        ctx.fillStyle = color;
        ctx.fill();
    } else if (choice ="eraser") {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = size;
        ctx.moveTo(old.x, old.y);
        ctx.lineTo(coord.x, coord.y);
        old = {x: x, y: y};
    } else if (choice ="text") {
        ctx.font = "${size}px Verdana";
        ctx.strokeText();
        ctx.strokeStyle = color;
    }

}
function stopPainting() {
    paint = false;
}
function sketch(event) {
    if (!paint) return;
    ctx.beginPath();
    ctx.lineWidth = document.querySelector('#inputWidth').value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = document.querySelector('#selColor').value;
    ctx.moveTo(coord.x, coord.y);
    getPosition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}
function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

