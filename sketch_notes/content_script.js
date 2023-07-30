let canvasOn = false
const canvasZindex = 100000
const controlBoxZindex = canvasZindex + 1
const textboxZindex = controlBoxZindex + 1
window.onload = function () {
  spawnThings()
  // chrome.storage.local.clear()
  const color_picker = document.createElement('input')
  color_picker.id = "color-picker"
  color_picker.type = "color"
  color_picker.value = "#00000"
}

function LoadTextBoxes(textBox_data) {
  textBox_data.forEach(textBox => {
    const textBoxIndex = textBox.id
    const draggableArea = document.createElement('div')
    const textBoxContainer = document.createElement('div')
    const textBoxTitle = document.createElement('input')
    const textBoxInput = document.createElement('textarea')


    draggableArea.dataset.draggable = 'true'

    textBoxContainer.className = 'sketch_textbox'

    const styles_draggableArea = {
      height: '20px',
      width: '100%',
      left: '0',
      top: '-20px',
      backgroundColor: 'black',
    }



    textBoxTitle.addEventListener('focus', () => { textBoxTitle.style.outline = 'none' })
    textBoxInput.addEventListener('focus', () => { textBoxInput.style.outline = 'none' })

    textBoxTitle.value = textBox.text.input
    textBoxInput.value = textBox.text.textarea

    textBoxContainer.appendChild(draggableArea)
    textBoxContainer.appendChild(textBoxTitle)
    textBoxContainer.appendChild(textBoxInput)

    Object.assign(textBoxContainer.style, textBox.props.textBoxContainer_props)
    Object.assign(textBoxTitle.style, textBox.props.textBoxTitle_props)
    Object.assign(textBoxInput.style, textBox.props.textBoxInput_props)
    Object.assign(draggableArea.style, styles_draggableArea)

    document.body.appendChild(textBoxContainer)
    let newBox = false
    //textBoxContainer.addEventListener('mousedown', (e) => {dragStart(e, textBoxContainer)})

    const textBoxOpions = { textBoxContainer, textBoxTitle, textBoxInput }
    textBoxContainer.style.display = 'none'
    textBoxContainer.addEventListener('mouseout', () => newBox = SaveTextBoxData(newBox, textBoxOpions, textBoxIndex))
    textBoxContainer.addEventListener('mouseup', () => newBox = SaveTextBoxData(newBox, textBoxOpions, textBoxIndex))
    textBoxContainer.addEventListener('keyup', (e) => UpdateTextBoxData(e.target, textBoxIndex))
  })

}

function spawnThings() {

  let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
  let strokeData = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []

  let textBoxData = sketchData ? sketchData.textBoxData ? sketchData.textBoxData : [] : []
  LoadTextBoxes(textBoxData)

  const controlContainer = createControlContainer()

  const create_textBox_btn = createButton("create-text-btn", "Spawn Textbox", controlContainer)
  //const load_btn = createButton("load-btn", "Load", controlContainer)
  const canvas = createCanvas();
  const toggle_canvas_btn = createCanvasToggle(canvas)
  const context = canvas.getContext('2d')
  //const sketchContainer = createSketchContainer();
  cavnasProc(canvas, context, strokeData)
  const clearButton = createClearBtn(canvas, context)

  // need to make textbox spawn at the current viewport top-left
  create_textBox_btn.addEventListener('click', () => document.body.appendChild(CreateTextBox(canvasOn)))

  const btnControlContainer = controlContainer.querySelector('#sketch-ctrl-container')
  btnControlContainer.appendChild(create_textBox_btn)
  //btnControlContainer.appendChild(load_btn)
  btnControlContainer.appendChild(clearButton)
  btnControlContainer.appendChild(toggle_canvas_btn)

  styleControlButtons(controlContainer, textStyes);

  controlContainer.style.zIndex = `${controlBoxZindex}`
  canvas.style.zIndex = `${canvasZindex}`

  document.body.appendChild(canvas)
  document.body.appendChild(controlContainer)

  window.addEventListener('scroll', increaseCanvasSize)
  window.addEventListener('resize', resizeCanvas)
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context.clearRect(0, 0, canvas.width, canvas.height);
    const sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    const strokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []

    strokes.forEach(stroke => drawLine(context, stroke.startX, stroke.startY - window.scrollY,
      stroke.endX, stroke.endY - window.scrollY, stroke.color, stroke.width))

  }
  function increaseCanvasSize() {
    // Set the new canvas dimensions
    canvas.style.top = `${window.scrollY}px`
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    const strokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []

    strokes.forEach(stroke => drawLine(context, stroke.startX, stroke.startY - window.scrollY,
      stroke.endX, stroke.endY - window.scrollY, stroke.color, stroke.width))

    // for control container
    if (controlContainer.offsetTop < window.scrollY) {
      controlContainer.style.top = `${window.scrollY}px`
    }
    if (controlContainer.offsetTop + controlContainer.getBoundingClientRect().height > window.innerHeight + window.scrollY) {
      controlContainer.style.top = `${window.scrollY + window.innerHeight - controlContainer.getBoundingClientRect().height}px`
    }
  }
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
  logo.dataset.draggable = 'true'
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
    document.querySelectorAll(".sketch_textbox").forEach(box => box.remove())
    context.clearRect(0, 0, canvas.width, canvas.height)
  })
  return button
}

function createCanvasToggle(canvas) {
  const button = document.createElement('button')
  button.id = 'toggle-canvas-btn'
  button.innerText = 'Toggle Sketch'
  button.addEventListener('click', () => {
    canvasOn = handleCanvasToggle(canvas, button)
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
  strokes.forEach(stroke => drawLine(context, stroke.startX, stroke.startY,
    stroke.endX, stroke.endY, stroke.color, stroke.width))

  canvas.addEventListener('mousedown', function (e) {
    isDrawing = true;

    lastX = e.pageX - canvas.offsetLeft;
    lastY = e.pageY - canvas.offsetTop;


  });

  canvas.addEventListener('mousemove', function (e) {

    if (isDrawing) {
      const { scrollX, scrollY } = window
      const { clientX, clientY } = e
      var currentX = clientX - canvas.offsetLeft + scrollX;
      var currentY = clientY - canvas.offsetTop + scrollY;

      drawLine(context, lastX, lastY, currentX, currentY, strokeColor, width);
      local_strokes.push({
        startX: lastX,
        startY: lastY + window.scrollY,
        endX: currentX,
        endY: currentY + window.scrollY,
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



  function saveStrokes() {

    let sketchData = JSON.parse(localStorage.getItem('sketch_data'))
    let currentSketchStrokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []
    let concatStrokes = currentSketchStrokes.concat(local_strokes)
    localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, strokes: concatStrokes }))
    local_strokes = []
  }

  return strokes
}

function drawLine(context, startX, startY, endX, endY, color, width) {
  // only draw if in view of the user
  if (startY > 0 && endY > 0 && startY < window.innerHeight && endY < window.innerHeight) {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = "black";
    context.lineWidth = width
    context.stroke();
  }

}