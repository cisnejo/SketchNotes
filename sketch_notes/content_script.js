

let canvasOn = false
const canvasZindex = 100000
const controlBoxZindex = canvasZindex + 1
const textboxZindex = controlBoxZindex + 1
const CONTROL_STATE = DRAWING_STATE

window.onload = function () {
  spawnThings()
}



function spawnThings() {

  //let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
  // let strokeData = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []

  //let stickyData = [{ x: 300, y: 300, w: 200, h: 200, color: 'yellow' }]

  const controlContainer = createControlContainer()

  const create_textBox_btn = createButton("create-text-btn", "Spawn Textbox", controlContainer)
  //const load_btn = createButton("load-btn", "Load", controlContainer)


  const toggle_canvas_btn = createCanvasToggle(SKETCH_CANVAS)
  //const context = canvas.getContext('2d')
  //const sketchContainer = createSketchContainer();

  //HandleStrokes(canvas, context, strokeData)
  // CreateStickyNotes(canvas, stickyData)

  const clearButton = createClearBtn(SKETCH_CANVAS, SKETCH_CANVAS.context)

  // need to make textbox spawn at the current viewport top-left

  const btnControlContainer = controlContainer.querySelector('#sketch-ctrl-container')
  btnControlContainer.appendChild(create_textBox_btn)
  //btnControlContainer.appendChild(load_btn)
  btnControlContainer.appendChild(clearButton)
  btnControlContainer.appendChild(toggle_canvas_btn)

  styleControlButtons(controlContainer, textStyes);

  controlContainer.style.zIndex = `${controlBoxZindex}`
  //canvas.style.zIndex = `${canvasZindex}`

  //document.body.appendChild(canvas)
  document.body.appendChild(controlContainer)

  window.addEventListener('scroll', () => increaseCanvasSize(SKETCH_CANVAS))
  window.addEventListener('resize', () => resizeCanvas(SKETCH_CANVAS))

  function resizeCanvas(CANVAS_CLASS) {
    CANVAS_CLASS.ResizeCanvas(window.innerWidth, window.innerHeight)
    const { canvas, context } = CANVAS_CLASS
    CANVAS_CLASS.ClearCanvas()

    const sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    // const strokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []
    // strokes.forEach(stroke => drawLine(context, stroke.startX, stroke.startY - window.scrollY,
    //   stroke.endX, stroke.endY - window.scrollY, stroke.color, stroke.width))
  }
  function increaseCanvasSize(CANVAS_CLASS) {
    const { scrollY } = window
    // Set the new canvas dimensions
    CANVAS_CLASS.ScrollCanvas(scrollY)
    CANVAS_CLASS.ClearCanvas()

    // const sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    sketchData = strokes.getStoredStrokes()
    // const strokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []
    strokes.forEach(stroke => stroke.drawLine(context, stroke.startX, stroke.startY - window.scrollY,
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
    // document.querySelectorAll(".sketch_textbox").forEach(box => box.remove())  CHANGE TO CANVAS BOX OBJECT 
    canvas.ClearCanvas()
  })
  return button
}

function createCanvasToggle(CLASS_CANVAS) {
  const button = document.createElement('button')
  button.id = 'toggle-canvas-btn'
  button.innerText = 'Toggle Sketch'
  button.addEventListener('click', () => {
    canvasOn = handleCanvasToggle(CLASS_CANVAS, button)
  })
  return button
}

