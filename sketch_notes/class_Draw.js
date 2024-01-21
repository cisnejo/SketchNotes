
let SKETCH_DATA = {
    localSketchData: { strokes: [], stickies: [] },
    localStrokes: [],
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    currentX: 0,
    currentY: 0,
    strokeColor: '#000000',
    lineWidth: 3,
    drawStrokes: function (startX, startY, endX, endY, strokeColor, strokeWidth) {
        const { context } = SKETCH_CANVAS

        if (startY >= 0 && endY >= 0 && startY <= window.innerHeight && endY <= window.innerHeight) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.strokeStyle = strokeColor;
            context.lineWidth = strokeWidth
            context.stroke();
        }
    },
    getStoredData: function () {
        const data = JSON.parse(localStorage.getItem('sketch_data'))
        if (data) {
            return data
        }
        else {
            return { strokes: [], stickies: [] }
        }

    },
    saveData: function () {

        let allStrokes = this.localStrokes.concat(this.getStoredData().strokes)
        this.localSketchData = { ...this.localSketchData, strokes: allStrokes }

        localStorage.setItem('sketch_data', JSON.stringify({ ...this.getStoredData(), strokes: this.localSketchData.strokes }))
        this.localStrokes = []
    },

    drawLine: function (e) {
        if (this.isDrawing) {
            const { canvas } = SKETCH_CANVAS
            const { scrollX, scrollY } = window
            const { clientX, clientY } = e
            let strokeColor = "#000000"
            let strokeWidth = 3
            this.currentX = clientX - canvas.offsetLeft + scrollX;
            this.currentY = clientY - canvas.offsetTop + scrollY;



            this.drawStrokes(this.lastX, this.lastY, this.currentX, this.currentY, strokeColor, strokeWidth);
            this.localStrokes.push({
                startX: this.lastX,
                startY: this.lastY + window.scrollY,
                endX: this.currentX,
                endY: this.currentY + window.scrollY,
                width: strokeWidth,
                color: strokeColor
            });
            this.lastX = this.currentX;
            this.lastY = this.currentY;
        }
    }
}

const DRAWING_STATE = {
    mousedown: function (e) {
        SKETCH_DATA.isDrawing = true;
        SKETCH_DATA.lastX = e.clientX
        SKETCH_DATA.lastY = e.clientY

    },

    mousemove: function (e) {
        SKETCH_DATA.drawLine(e)
    },

    mouseup: function () {
        SKETCH_DATA.isDrawing = false;
        SKETCH_DATA.saveData();
    },
    mouseleave: function () {

        SKETCH_DATA.isDrawing = false;
        //strokes.saveData();
    }
}

/* 
    const sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    const strokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []
    strokes.forEach(stroke => drawLine(context, stroke.startX, stroke.startY - window.scrollY,
      stroke.endX, stroke.endY - window.scrollY, stroke.color, stroke.width))
*/