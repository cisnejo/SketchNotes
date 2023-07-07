
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

    canvas.width = largestElement.width
    canvas.height = largestElement.height


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

function handleCanvasToggle(canvasOn, canvas, btn_toggle) {

    canvasOn ? canvas.style.display = "none" : canvas.style.display = 'inline-block'
    canvasOn ? btn_toggle.style.backgroundColor = 'RGB(240, 240, 240)' : btn_toggle.style.backgroundColor = 'black'
    canvasOn ? btn_toggle.style.color = "black" : btn_toggle.style.color = 'white'
    return !canvasOn
}


function dragStart(event, container, newBox, textBoxObject, textBoxIndex) {
    isDragging = true;
    dragX = event.clientX - container.offsetLeft;
    dragY = event.clientY - container.offsetTop;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", () => dragEnd(newBox, textBoxObject, textBoxIndex));
    document.addEventListener('mouseleave', () => dragEnd(newBox, textBoxObject, textBoxIndex));

    function drag(event) {
        if (isDragging) {
            container.style.left = event.clientX - dragX + "px";
            container.style.top = event.clientY - dragY + "px";
        }
    }

    function dragEnd() {
        isDragging = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", dragEnd);
    }

}


function GetElementProps(stylesObject) {
    return Array.from(stylesObject).reduce((acc, propName) => {
        acc[propName] = stylesObject.getPropertyValue(propName);
        return acc;
    }, {});

}


