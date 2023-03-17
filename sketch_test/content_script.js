window.onload = function () {
  spawnThings()
  const color_picker = document.createElement('input')
  color_picker.id = "color-picker"
  color_picker.type = "color"
  color_picker.value = "#00000"

  // checkLocalStorage(window.location.href)
}

/* sapwn in the control container and canvas 
    this should also be within a div*/
function spawnThings() {

  let strokes = JSON.parse(localStorage.getItem('strokes')) || [];

  const controlContainer = createControlContainer()

  const save_btn = createButton("save-btn", "Save", controlContainer)
  const load_btn = createButton("load-btn", "Load", controlContainer)
  const canvas = createCanvas();
  const toggle_canvas_btn = createCanvasToggle(canvas)
  const context = canvas.getContext('2d')
  const sketchContainer = createSketchContainer();

  const clearButton = createClearBtn(context, strokes)
  cavnasProc(canvas, context, strokes)

  controlContainer.appendChild(save_btn)
  controlContainer.appendChild(load_btn)
  controlContainer.appendChild(clearButton)
  controlContainer.appendChild(toggle_canvas_btn)

controlContainer.querySelectorAll('button').forEach(btn=>{
  btn.style.display='block'
  btn.style.padding='10px'
})
  controlContainer.style.zIndex = "3000"
  canvas.style.zIndex = "2000"

  //sketchContainer.appendChild(controlContainer)
  //sketchContainer.append(canvas)

  document.body.appendChild(canvas)
  document.body.appendChild(controlContainer)


  function createSketchContainer() {
    const div = document.createElement("div")
    div.style.position = "absolute"
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.top = "0"
    div.style.left = "0"
    return div
  }

  function createControlContainer() {

    const div = document.createElement("div")
    div.id = "sketch-ctrl-container"
    div.style.position = "absolute"
    // div.style.width = "300px";
    div.style.height = "50px";
    div.style.left = "0"
    div.style.top = "0"
    div.style.backgroundColor = "blue"
    div.style.display = 'flex'
    div.style.justifyContent = "space-between"
    div.style.gap = "10px"
    div.style.marginTop= "2px"
    div.style.marginBottom= "2px"

    div.addEventListener('mousedown', dragStart)

    function dragStart(event) {
      isDragging = true;
      dragX = event.clientX - div.offsetLeft;
      dragY = event.clientY - div.offsetTop;

      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", dragEnd);
    }

    function drag(event) {
      if (isDragging) {
        div.style.left = event.clientX - dragX + "px";
        div.style.top = event.clientY - dragY + "px";
      }
    }

    function dragEnd(event) {
      isDragging = false;

      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", dragEnd);
    }
    return div
  }


  function createCanvas() {
    const canvas = document.createElement('canvas')
    canvas.id = "canvas"
    canvas.style.display = 'none'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.position = "absolute"
    return canvas
  }



  function createButton(id, innerText) {
    const button = document.createElement('button')
    button.id = id;
    button.innerText = innerText
    return button
  }

  function createClearBtn(context) {
    const button = document.createElement("button")
    button.id = "clr-btn"
    button.innerText = "clear Notes"
    button.addEventListener('click', () => {
      localStorage.setItem('strokes', JSON.stringify([]))
      context.clearRect(0, 0, canvas.width, canvas.height)
    })
    return button
  }

  function createCanvasToggle(canvas) {
    const button = document.createElement('button')
    button.id = 'toggle-canvas-btn'
    button.innerText = 'Toggle Sketch'
    let canvasOn = false
    button.addEventListener('click', () => {
      canvasOn ? canvas.style.display = "none" : canvas.style.display = 'inline-block'
      canvasOn = !canvasOn
    })
    return button
  }

}


function cavnasProc(canvas, context, strokes) {

  var isDrawing = false;
  var lastX = 0;
  var lastY = 0;
  var local_strokes = []
  var strokeColor = '#000000';
  let width = 3;


  // Load saved strokes
  strokes.forEach(stroke => drawLine(stroke.startX, stroke.startY,
    stroke.endX, stroke.endY, stroke.color, stroke.width))

  canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;
    lastX = e.clientX - canvas.offsetLeft;
    lastY = e.clientY - canvas.offsetTop;


  });

  canvas.addEventListener('mousemove', function (e) {

    if (isDrawing) {
      var currentX = e.clientX - canvas.offsetLeft;
      var currentY = e.clientY - canvas.offsetTop;
      drawLine(lastX, lastY, currentX, currentY, strokeColor, width);
      local_strokes.push({
        startX: lastX,
        startY: lastY,
        endX: currentX,
        endY: currentY,
        width: width,
        color: strokeColor
      });

      lastX = currentX;
      lastY = currentY;
    }
  });

  canvas.addEventListener('mouseup', function () {
    isDrawing = false;
    saveStrokes();
  });

  canvas.addEventListener('mouseleave', function () {
    isDrawing = false;
  });

  function drawLine(startX, startY, endX, endY, color, width) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = "black";
    context.lineWidth = width
    context.stroke();
  }

  function saveStrokes() {
    let current_strokes = JSON.parse(localStorage.getItem('strokes')) || []
    let save_strokes = current_strokes.concat(local_strokes)
    localStorage.setItem('strokes', JSON.stringify(save_strokes));
    local_strokes = []
  }

  return strokes
}