function styleCanvas(canvas) {
    canvas.style.display = 'none'
    canvas.width = document.body.getBoundingClientRect().width
    canvas.height =  document.body.getBoundingClientRect().height
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.margin = '0'
    canvas.style.padding = '0'
    canvas.style.position = "absolute"
}

function styleControlButtons(controlContainer, styles = null) {
    controlContainer.querySelectorAll('button').forEach(btn => {
        if (styles) {
            Object.assign(btn.style, styles)
            const customStyles = {
                paddingInline: '2px',
                margin: '2px',
                letterSpacing: '1px',
                backgroundColor:'RGB(240, 240, 240)',
                border:'1px solid black'
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

function handleCanvasToggle(canvasOn, canvas, btn_toggle) {

    canvasOn ? canvas.style.display = "none" : canvas.style.display = 'inline-block'
    canvasOn ? btn_toggle.style.backgroundColor = 'RGB(240, 240, 240)' : btn_toggle.style.backgroundColor = 'black'
    canvasOn ? btn_toggle.style.color = "black" : btn_toggle.style.color = 'white'
    return !canvasOn
}