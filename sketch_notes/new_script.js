function styleCanvas(canvas) {
    canvas.style.display = 'none'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.margin = '0'
    canvas.style.padding = '0'
    canvas.style.position = "absolute"
}

function styleControlButtons(controlContainer) {
    controlContainer.querySelectorAll('button').forEach(btn => {
        btn.style.margin = '20px'
        btn.style.backgroundColor = 'black'
        btn.style.color = 'white'
    })
}

function styleControllerContainer(controllerContainer) {
    controllerContainer.style.position = "absolute"
    controllerContainer.style.left = "0"
    controllerContainer.style.top = "0"
    controllerContainer.style.backgroundColor = "grey"
    controllerContainer.style.display = 'flex'
    controllerContainer.style.justifyContent = "space-between"

}

function handleCanvasToggle(canvasOn, canvas, btn_toggle) {
    canvasOn ? canvas.style.display = "none" : canvas.style.display = 'inline-block'
    canvasOn ? btn_toggle.style.backgroundColor = "black" : btn_toggle.style.backgroundColor = 'green'
    canvasOn ? btn_toggle.style.color = "white" : btn_toggle.style.color = 'black'
    return !canvasOn
}