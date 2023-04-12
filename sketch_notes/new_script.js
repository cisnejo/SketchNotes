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


function CreateTextBox() {

    const sketchData = JSON.parse(localStorage.getItem('sketch_data'))
    const textBoxIndex = sketchData ? sketchData.textBoxData ? sketchData.textBoxData.length : 0 : 0
    const textBoxContainer = document.createElement('div')
    const textBoxTitle = document.createElement('p')
    const textBoxInput = document.createElement('input')

    const styles_textBoxContainer = {
        height: '400px',
        width: '400px',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0',
        top: '0',
        backgroundColor: 'RGB(0,0,0)',
        zIndex: '10000'
    }
    const styles_textBoxTitle = {}
    const styles_textBoxInput = {
        flex: '1'
    }


    Object.assign(textBoxContainer.style, styles_textBoxContainer)
    Object.assign(textBoxTitle.style, styles_textBoxTitle)
    Object.assign(textBoxInput.style, styles_textBoxInput)

    let newBox = true

    textBoxTitle.innerText = "title"
    textBoxContainer.appendChild(textBoxTitle)
    textBoxContainer.appendChild(textBoxInput)


    textBoxContainer.addEventListener('mousedown', (e) => {
        dragStart(e, textBoxContainer)
        newBox = MoveItem(newBox, { textBoxContainer, textBoxTitle, textBoxInput }, textBoxIndex)

    })

    return textBoxContainer
}


function dragStart(event, container) {
    isDragging = true;
    dragX = event.clientX - container.offsetLeft;
    dragY = event.clientY - container.offsetTop;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
    document.addEventListener('mouseleave', dragEnd);

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


function MoveItem(newBox, textBoxContainer, textBoxIndex) {

    const textBoxtextBoxContainer_styles = window.getComputedStyle(textBoxContainer.textBoxContainer);
    const textBoxTitle_styles = window.getComputedStyle(textBoxContainer.textBoxTitle);
    const textBoxInput_styles = window.getComputedStyle(textBoxContainer.textBoxInput);

    // create an object to store the styles using reduce
    // this is currently on mouseDown, needs to be on 'dragEnd' and add event listeners to loading
    const textBoxContainer_props = Array.from(textBoxtextBoxContainer_styles).reduce((acc, propName) => {
        acc[propName] = textBoxtextBoxContainer_styles.getPropertyValue(propName);
        return acc;
    }, {});
    const textBoxTitle_props = Array.from(textBoxTitle_styles).reduce((acc, propName) => {
        acc[propName] = textBoxTitle_styles.getPropertyValue(propName);
        return acc;
    }, {});
    const textBoxInput_props = Array.from(textBoxInput_styles).reduce((acc, propName) => {
        acc[propName] = textBoxInput_styles.getPropertyValue(propName);
        return acc;
    }, {});


    let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    let currentSketchBoxData = sketchData ? sketchData.textBoxData ? sketchData.textBoxData : [] : null

    if (currentSketchBoxData && currentSketchBoxData.length < 1) {
        localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: [{ id: textBoxIndex, props: { textBoxContainer_props, textBoxTitle_props, textBoxInput_props } }] }))

    }
    else if (currentSketchBoxData && currentSketchBoxData.length >= 1) {
        if (newBox) {
            //if not then add it to the list
            localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: [...sketchData.textBoxData, { id: textBoxIndex, props: { textBoxContainer_props, textBoxTitle_props, textBoxInput_props } }] }))

        }
        else if (!newBox) {

            const newTextBoxData = sketchData.textBoxData.map(textBox => {
                if (textBox.id == textBoxIndex) textBox.props = { textBoxContainer_props, textBoxTitle_props, textBoxInput_props }
                return textBox
            }


            )
            localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: newTextBoxData }))

        }
    }
    else {
        localStorage.setItem('sketch_data', JSON.stringify({ textBoxData: [{ id: textBoxIndex, props: { textBoxContainer_props, textBoxTitle_props, textBoxInput_props } }] }))

    }
    newBox = false;
    return newBox
}
