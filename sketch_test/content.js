
import { sizeCanvas } from './canvas.js'
import { MakeContainerDraggable } from './Draggable.js';



window.onload = function () {
    const canvas = document.getElementById("sketch-canvas");
    const context = canvas.getContext("2d");
    const toggle_canvas_btn = document.getElementById('toggle-btn');
    const editContainer = document.getElementById("edit-container");


    let strokes = JSON.parse(localStorage.getItem("strokes")) || [];
    let canvasOn = false;

    document.getElementById("clr-btn").addEventListener("click", () => {
        localStorage.setItem("strokes", JSON.stringify([]));
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    toggle_canvas_btn.addEventListener("click", () => {
        canvasOn = handleCanvasToggle(canvasOn, canvas, toggle_canvas_btn);
    });

    editContainer.addEventListener("mousedown", (e) => MakeContainerDraggable(e, editContainer));

    // sizeCanvas needs to come before AddCanvasFuntions
    sizeCanvas(canvas, strokes)

    /* append all note boxes or labels to 'sketchNotesContainer' so that visibility can be controlled */
    const sketchNotesContainer = document.getElementById('sketch-notes-container')
    const oneBox = CreateTextBox()
    oneBox.addEventListener("mousedown", (e) => MakeContainerDraggable(e, oneBox));
    sketchNotesContainer.appendChild(oneBox)
    // const styles = window.getComputedStyle(oneBox)
    const twoBox = CreateTextBox()
    /* ----------*/
    const element = oneBox;
    const computedStyles = window.getComputedStyle(element);
    console.log()
    const styles = Array.from(computedStyles).reduce((acc, propName) => {

        return {
            ...acc,
            [propName]: computedStyles.getPropertyValue(propName),
        };
    }, {});

    Object.assign(twoBox.style, styles);
    /* ----------  */
    sketchNotesContainer.appendChild(twoBox)
    //Object.assign(twoBox.style, styles)
    twoBox.addEventListener("mousedown", (e) => MakeContainerDraggable(e, twoBox));
}


function handleCanvasToggle(canvasOn, canvas, btn_toggle) {
    const sketchNotesContainer = document.getElementById('sketch-notes-container')
    //canvasOn ? canvas.style.display = "none" : canvas.style.display = 'inline-block'
    canvasOn ? sketchNotesContainer.dataset.visible = 'false' : sketchNotesContainer.dataset.visible = 'true'
    canvasOn ? btn_toggle.dataset.togglestate = 'off' : btn_toggle.dataset.togglestate = 'on'
    return !canvasOn
}

function CreateTextBox(width = 300, left = 300, top = 300, label = 'label', text = '') {
    const boxStyles = {
        position: 'absolute',
        width: `${width}px`,
        height: `auto`,
        left: `${left}px`,
        top: `${top}px`,
        border: '1px solid black'
    }

    const labelStyles = {

    }
    const inputStyles = {
        value: text
    }

    const textBoxContainer = document.createElement('div')
    const textLabel = document.createElement('p')
    const textInput = document.createElement('input')
    textInput.placeholder = 'notes ...'
    textLabel.innerText = label
    Object.assign(textBoxContainer.style, boxStyles)
    Object.assign(textLabel.style, labelStyles)
    Object.assign(textInput.style, inputStyles)

    if (text !== '') textInput.value = text
    textBoxContainer.appendChild(textLabel)
    textBoxContainer.appendChild(textInput)

    return textBoxContainer
}

function getStyles(element) {

    const computedStyles = window.getComputedStyle(element);

    const styles = Object.keys(computedStyles).reduce((acc, propName) => {
        return {
            ...acc,
            [propName]: computedStyles.getPropertyValue(propName),
        };
    }, {});

    const otherElement = document.getElementById("otherElement");

    Object.assign(otherElement.style, styles);
}