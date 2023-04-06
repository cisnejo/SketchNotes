
/* ---------- chrome API for get and set storage sync ------------

GET
chrome.storage.sync.get("myKey", function (obj) {
  console.log(obj);
});

SET
chrome.storage.sync.set({"myKey": testPrefs})

*/


/* -----SCHEMA -------- */

/* 
  {
    strokes:[],boxes:[]...
  }
*/
window.onload = function () {
  spawnThings()
  // chrome.storage.local.clear()
  const color_picker = document.createElement('input')
  color_picker.id = "color-picker"
  color_picker.type = "color"
  color_picker.value = "#00000"
}
// checkLocalStorage(window.location.href)




/* sapwn in the control container and canvas 
    this should also be within a div*/
/* ---- Maybe use this later maybe not( chrome API for storage)
function spawnThings() {

chrome.storage.local.get("sketch_data", function (obj) {

  let strokes = obj.sketch_data ? obj.sketch_data.strokes ? obj.sketch_data.strokes : [] : []
  console.log(obj)

  cavnasProc(canvas, context, strokes)

  var dataSize = JSON.stringify(obj.sketch_data).length;
  //console.log('Size of myItem: ' + dataSize/1000 + ' kbytes');

});
*/



function spawnThings() {
  let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
  let strokeData = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []

  const controlContainer = createControlContainer()

  const save_btn = createButton("save-btn", "Save", controlContainer)
  const load_btn = createButton("load-btn", "Load", controlContainer)
  const canvas = createCanvas();
  const toggle_canvas_btn = createCanvasToggle(canvas)
  const context = canvas.getContext('2d')
  //const sketchContainer = createSketchContainer();
  cavnasProc(canvas, context, strokeData)
  const clearButton = createClearBtn(canvas, context)




  const btnControlContainer = controlContainer.querySelector('#sketch-ctrl-container')
  btnControlContainer.appendChild(save_btn)
  btnControlContainer.appendChild(load_btn)
  btnControlContainer.appendChild(clearButton)
  btnControlContainer.appendChild(toggle_canvas_btn)

  styleControlButtons(controlContainer, textStyes);

  controlContainer.style.zIndex = "3000"
  canvas.style.zIndex = "2000"

  document.body.appendChild(canvas)
  document.body.appendChild(controlContainer)

}
function CreateSketchContainer() {
  const sketchContainer = document.createElement("div")
  const styles_sketchContainer = {
    position: absolute,
    top: 0,
    left: 0,
    zIndex: 10000
  }

  Object.assign(sketchContainer.style, styles_sketchContainer)
}

function createControlContainer() {
  const container = document.createElement('div')
  const btnContainer = document.createElement("div")
  const logo = document.createElement('div')
  logo.innerText = 'sketch notes'
  btnContainer.id = "sketch-ctrl-container"
  styleLogo(logo, textStyes)
  styleControllerContainer(container)
  container.appendChild(logo)
  container.appendChild(btnContainer)
  container.addEventListener('mousedown', (e) => dragStart(e, container))
  return container
}


function createCanvas() {
  const canvas = document.createElement('canvas')
  styleCanvas(canvas)
  return canvas
}

function createButton(id, innerText) {
  const button = document.createElement('button')
  button.id = id;
  button.innerText = innerText
  return button
}

function createClearBtn(canvas, context) {
  const button = document.createElement("button")
  button.id = "clr-btn"
  button.innerText = "clear Notes"
  button.addEventListener('click', () => {
    localStorage.setItem('sketch_data', JSON.stringify([]))
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
    canvasOn = handleCanvasToggle(canvasOn, canvas, button)
  })
  return button
}




function cavnasProc(canvas, context, strokes) {

  var isDrawing = false;
  var lastX = 0;
  var lastY = 0;
  var local_strokes = []
  var strokeColor = '#000000';
  let width = 3;

  //Load saved strokes
  strokes.forEach(stroke => drawLine(stroke.startX, stroke.startY,
    stroke.endX, stroke.endY, stroke.color, stroke.width))

  canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;

    lastX = e.pageX - canvas.offsetLeft;
    lastY = e.pageY - canvas.offsetTop;


  });

  canvas.addEventListener('mousemove', function (e) {

    if (isDrawing) {
      var currentX = e.pageX - canvas.offsetLeft;
      var currentY = e.pageY - canvas.offsetTop;
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

    let sketchData = JSON.parse(localStorage.getItem('sketch_data'))
    let currentSketchStrokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []
    let concatStrokes = currentSketchStrokes.concat(local_strokes)
    localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, strokes: concatStrokes }))
    local_strokes = []
  }

  return strokes
}