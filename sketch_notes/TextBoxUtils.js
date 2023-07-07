const validTextBoxChildren = ['input', 'textarea']

function CreateTextBox() {

    const sketchData = JSON.parse(localStorage.getItem('sketch_data'))
    const textBoxIndex = sketchData ? sketchData.textBoxData ? sketchData.textBoxData.length : 0 : 0
    const textBoxContainer = document.createElement('div')
    const textBoxTitle = document.createElement('input')
    const textBoxInput = document.createElement('textarea')

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

    textBoxTitle.value = 'Title'
    textBoxContainer.appendChild(textBoxTitle)
    textBoxContainer.appendChild(textBoxInput)

    const textBoXProps = { textBoxContainer, textBoxTitle, textBoxInput }

    textBoxContainer.addEventListener('mousedown', (e) => {
        dragStart(e, textBoxContainer, newBox, textBoXProps, textBoxIndex)

    })



    textBoxContainer.addEventListener('mouseout', () => newBox = SaveTextBoxData(newBox, textBoXProps, textBoxIndex))
    textBoxContainer.addEventListener('mouseup', () => newBox = SaveTextBoxData(newBox, textBoXProps, textBoxIndex))
    textBoxContainer.addEventListener('keyup', (e) => UpdateTextBoxData(e.target, textBoxIndex))

    return textBoxContainer
}

// need to update the text Components (input and textarea) with the new values into the local storage
function UpdateTextBoxData(target, textBoxIndex) {
    const element_lowerCase = target.tagName.toLowerCase()
    switch (element_lowerCase) {
        case 'input':
            console.log('input')
            break;
        case 'textarea':
            console.log('textarea')
            break;
        default: console.log('no valid children');
    }
}

function AppendTextBoxData(textComponent, textBoxIndex) {
    let sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    const newTextBoxData = sketchData.textBoxData.map(textBox => {
        if (textBox.id == textBoxIndex) textBox.text = { textBoxContainer_props, textBoxTitle_props, textBoxInput_props }
        return textBox
    }


    )
    localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, textBoxData: newTextBoxData }))
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

function GetTextBoxData(textBox) {
    console.log(textBox)
}