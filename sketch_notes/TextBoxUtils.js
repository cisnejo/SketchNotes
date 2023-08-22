const validTextBoxChildren = ['input', 'textarea']

function CreateTextBox() {
    const sketchData = JSON.parse(localStorage.getItem('sketch_data'))
    const textBoxIndex = sketchData ? sketchData.textBoxData ? sketchData.textBoxData.length : 0 : 0
    const textBoxContainer = document.createElement('div')
    const draggableArea = document.createElement('div')
    const textBoxTitle = document.createElement('input')
    const textBoxInput = document.createElement('textarea')
    const textBoxResizeArea = document.createElement('div')
    const deleteBox = document.createElement("div")

    draggableArea.dataset.draggable = 'true'

    textBoxTitle.addEventListener('focus', () => { textBoxTitle.style.outline = 'none' })
    textBoxInput.addEventListener('focus', () => { textBoxInput.style.outline = 'none' })

    const styles_deleteBox = {
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        position: 'absolute',
        top: '0',
        right: '0'
    }

    const styles_textBoxContainer = {
        height: '200px',
        width: '200px',
        border: 'none',
        display: canvasOn ? 'flex' : 'none',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        left: '0',
        top: '0',
        backgroundColor: 'RGB(245, 245, 66)',
        zIndex: `${textboxZindex}`,
        paddingBottom: '5px'
    }

    const styles_draggableArea = {
        height: '20px',
        width: '100%',
        left: '0',
        top: '-20px',
        backgroundColor: 'black',
    }

    const styles_textBoxTitle = {
        border: 'none',
        height: '50px',
        width: '90%',
        fontSize: '20px',
        border: 'none',
        paddingBottom: '5px',
        backgroundColor: 'rgba(0,0,0,0)',
    }

    const styles_textBoxInput = {
        flex: '1',
        border: 'none',
        width: '90%',
        paddingBottom: '5px',
        backgroundColor: 'rgba(0,0,0,0)',
        resize: 'none',
    }

    const styles_resizeArea = {
        width: '20px',
        height: '20px',
        backgroundColor: 'black',
        position: 'absolute',
        bottom: '0',
        right: '0'
    }

    textBoxContainer.className = 'sketch_textbox'

    Object.assign(textBoxContainer.style, styles_textBoxContainer)
    Object.assign(textBoxTitle.style, styles_textBoxTitle)
    Object.assign(textBoxInput.style, styles_textBoxInput)
    Object.assign(draggableArea.style, styles_draggableArea)
    Object.assign(textBoxResizeArea.style, styles_resizeArea)
    let newBox = true

    textBoxTitle.value = 'Title'
    textBoxContainer.appendChild(draggableArea)
    textBoxContainer.appendChild(textBoxTitle)
    textBoxContainer.appendChild(textBoxInput)
    textBoxContainer.appendChild(textBoxResizeArea)
    textBoxContainer.appendChild(deleteBox)

    const textBoXProps = { textBoxContainer, textBoxTitle, textBoxInput }

    textBoxContainer.addEventListener('mouseout', () => newBox = SaveTextBoxData(newBox, textBoXProps, textBoxIndex))
    textBoxContainer.addEventListener('mouseup', () => newBox = SaveTextBoxData(newBox, textBoXProps, textBoxIndex))
    textBoxContainer.addEventListener('keyup', (e) => UpdateTextBoxData(e.target, textBoxIndex))
    textBoxResizeArea.addEventListener('mousedown', (e) => resizeArea(e, newBox, textBoXProps, textBoxIndex))
    deleteBox.addEventListener('click', (e) => {
        const { parentElement } = e.target
        let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
        const newTextBoxData = sketchData.textBoxData.filter(textBoxInfo => {
            return textBoxIndex !== textBoxInfo.id
        })
        localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: newTextBoxData }))


        parentElement.remove()
        // clear the canvas

    })
    return textBoxContainer
}

// need to update the text Components (input and textarea) with the new values into the local storage
function UpdateTextBoxData(target, textBoxIndex) {
    const element_lowerCase = target.tagName.toLowerCase()
    if (element_lowerCase === 'input' || element_lowerCase === 'textarea') {
        const parent = target.parentElement
        const input = parent.querySelector('input')
        const textarea = parent.querySelector('textarea')
        AppendTextBoxData({ input: input.value, textarea: textarea.value }, textBoxIndex)
    }
}

function AppendTextBoxData(textDataObject, textBoxIndex) {
    let sketchData = JSON.parse(localStorage.getItem('sketch_data'));

    const newTextBoxData = sketchData.textBoxData.map(textBox => {
        if (textBox.id == textBoxIndex) textBox.text = { input: textDataObject.input, textarea: textDataObject.textarea }
        return textBox
    }
    )

    localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: newTextBoxData }))
}

function resizeArea(e, newBox, textBoXProps, textBoxIndex) {
    const { target } = e

    const parent = target.parentElement
    const { offsetWidth, offsetHeight } = parent
    let { clientX, clientY } = e
    console.log(parent)
    window.addEventListener('mousemove', drag)
    window.addEventListener('mouseup', removeListeners)

    SaveTextBoxData(newBox, textBoXProps, textBoxIndex)

    function drag(e) {
        let { clientX: currentX, clientY: currentY } = e
        const delta = { x: currentX - clientX, y: currentY - clientY }
        parent.style.width = `${offsetWidth + delta.x}px`
        parent.style.height = `${offsetHeight + delta.y}px`
    }

    function removeListeners() {
        window.removeEventListener('mousemove', drag)
        window.removeEventListener('mouseup', removeListeners)
    }
}


function SaveTextBoxData(newBox, textBoxContainer, textBoxIndex) {

    const textBoxtextBoxContainer_styles = window.getComputedStyle(textBoxContainer.textBoxContainer);
    const textBoxTitle_styles = window.getComputedStyle(textBoxContainer.textBoxTitle);
    const textBoxInput_styles = window.getComputedStyle(textBoxContainer.textBoxInput);

    // create an object to store the styles using reduce
    // this is currently on mouseDown, needs to be on 'dragEnd' and add event listeners to loading
    const textBoxContainer_props = GetElementProps(textBoxtextBoxContainer_styles)
    const textBoxTitle_props = GetElementProps(textBoxTitle_styles)
    const textBoxInput_props = GetElementProps(textBoxInput_styles)




    let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    let currentSketchBoxData = sketchData ? sketchData.textBoxData ? sketchData.textBoxData : [] : null

    if (currentSketchBoxData && currentSketchBoxData.length < 1) {

        localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: [{ id: textBoxIndex, props: { textBoxContainer_props, textBoxTitle_props, textBoxInput_props }, text: { input: "Title", textarea: "" } }] }))

    }
    else if (currentSketchBoxData && currentSketchBoxData.length >= 1) {
        if (newBox) {

            //if not then add it to the list
            localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: [...sketchData.textBoxData, { id: textBoxIndex, props: { textBoxContainer_props, textBoxTitle_props, textBoxInput_props }, text: { input: "Title", textarea: "" } }] }))
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

function GetTextBoxData(textBox) {

}