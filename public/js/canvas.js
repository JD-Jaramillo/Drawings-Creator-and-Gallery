window.addEventListener('load', () => {

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', tool);
});
const saveBtn = document.getElementById('save')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(238,238,238)";
ctx.fillRect(0,0,800,500);
let coord = { x: 0, y: 0 };
let paint = false;

// Saves current image and fetches API to post image data
const saveButtonHandler = async (event) => {
    // Captures drawing data from canvas element and converts to DataURL with image/jpeg formatting
    const imageURL = document.querySelector('#canvas').toDataURL( 'image/jpeg', 1.0);
    const fileName = localStorage.getItem('lastDrawing');

    // Posts to API, passing DataURL and filename as stringified JSON object
    if (event.target.id === 'save') {
      const response = await fetch(`/api/drawing/save`, {
        method: 'PUT',
        body: JSON.stringify({ imageURL, fileName, id: event.target.dataset.id }),
        headers: {
            "Content-Type": "application/json"
        }
      });
  
      if (response.ok) {
        // document.location.replace('/drawing');
      } else {
        alert('Failed to save drawing');
      }
    }
  };
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
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

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

saveBtn.addEventListener('click', saveButtonHandler);