
function styleCanvas(canvas) {
    canvas.style.display = 'none'
    // need to change this to be the body
    const largestElement = Array.from(document.getElementsByTagName('*')).reduce((acc, curr) => {
        if (curr.offsetWidth > acc.width) acc.width = curr.offsetWidth
        if (curr.offsetHeight > acc.height) acc.height = curr.offsetHeight
        return acc
    }, {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
    })
    const canvas_stlyes = {

        left: "0",
        top: "0",
        margin: "0",
        padding: "0",
        position: "absolute",
    }
    Object.assign(canvas.style, canvas_stlyes)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


}

function styleControlButtons(controlContainer, styles = null) {
    controlContainer.querySelectorAll('button').forEach(btn => {
        if (styles) {
            Object.assign(btn.style, styles)
            const customStyles = {
                paddingInline: '2px',
                margin: '2px',
                letterSpacing: '1px',
                backgroundColor: 'RGB(240, 240, 240)',
                border: '1px solid black'
            }
            Object.assign(btn.style, customStyles)
        }
        else {
            btn.style.margin = '20px'
            btn.style.backgroundColor = 'black'
            btn.style.color = 'white'
        }
    })
}

function styleControllerContainer(controllerContainer) {


    controllerContainer.style.position = "absolute"
    controllerContainer.style.left = "0"
    controllerContainer.style.top = "0"
    controllerContainer.style.backgroundColor = "RGB(240, 240, 240)"
    controllerContainer.style.display = 'flex'
    controllerContainer.style.flexDirection = 'column'
}

function styleBtnContainer(btnContainer) {
    const style = btnContainer.style
    style.display = 'flex'
}

const textStyes = {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '10px',
    color: '#1d1d1d',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textAlign: 'center',
}

function styleLogo(logo, styles = null) {
    if (styles) {
        Object.assign(logo.style, styles)
        logo.style.fontSize = '14px'
    }
    else {
        const style = logo.style
        style.fontFamily = 'Arial, sans-serif'
        style.fontWeight = 'bold'
        style.fontSize = '24px'
        style.color = '#1d1d1d'
        style.textTransform = 'uppercase'
        style.letterSpacing = '2psx'
        style.textAlign = 'center'
        style.padding = '10px'
        style.border = '1px solid black'
        style.borderRadius = '5px'
        style.boxShadow = '2px 2px 4px rgba(0,0,0,0.3)'
    }

}

function handleCanvasToggle(canvas, btn_toggle) {

    canvasOn ? canvas.style.display = "none" : canvas.style.display = 'block'
    canvasOn ? btn_toggle.style.backgroundColor = 'RGB(240, 240, 240)' : btn_toggle.style.backgroundColor = 'black'
    canvasOn ? btn_toggle.style.color = "black" : btn_toggle.style.color = 'white'

    Array.from(document.querySelectorAll('.sketch_textbox')).forEach(textbox => {
        if (canvasOn) {
            textbox.style.display = 'none'
        }
        else {
            textbox.style.display = 'block'
        }
    })
    return !canvasOn
}

window.addEventListener('mousedown', (e) => {
    const { target } = e
    const isDraggable = e.target.getAttribute('data-draggable')

    if (!target.parentElement) return
    if (!isDraggable) return

    const parent = target.parentElement
    const { offsetLeft, offsetTop } = parent
    let { clientX, clientY } = e

    window.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', removeListeners)

    function drag(e) {
        let { clientX: currentX, clientY: currentY } = e
        const delta = { x: currentX - clientX, y: currentY - clientY }
        parent.style.top = `${offsetTop + delta.y}px`
        parent.style.left = `${offsetLeft + delta.x}px`
    }

    function removeListeners() {
        window.removeEventListener('mousemove', drag)
        window.removeEventListener('mouseup', removeListeners)
    }
})

function GetElementProps(stylesObject) {
    return Array.from(stylesObject).reduce((acc, propName) => {
        acc[propName] = stylesObject.getPropertyValue(propName);
        return acc;
    }, {});
}


