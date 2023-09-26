
let strokes = {
    localSketchData: { strokes: [], stickies: [] },
    localStrokes: [],
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    strokeColor: '#000000',
    lineWidth: 3,
    drawStrokes: function (context, startX, startY, endX, endY, color, width) {
        if (startY >= 0 && endY >= 0 && startY <= window.innerHeight && endY <= window.innerHeight) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.strokeStyle = "black";
            context.lineWidth = width
            context.stroke();
        }
    },
    getStoredStrokes: function () {

    },
    saveStrokes: function () {
        this.localSketchData = { ...this.localSketchData, strokes: [this.localSketchData.strokes, this.localStrokes] }
        localStorage.setItem('sketch_data', JSON.stringify({ ...sketchData, strokes: this.localSketchData }))
        this.localStrokes = []
    },
    drawLine: function (e, CANVAS_CLASS) {
        if (this.isDrawing) {
            const { scrollX, scrollY } = window
            const { clientX, clientY } = e
            const { context, canvas } = CANVAS_CLASS
            let strokeColor = "#000000"
            let width = 3
            var currentX = clientX - canvas.offsetLeft + scrollX;
            var currentY = clientY - canvas.offsetTop + scrollY;



            this.drawStrokes(context, this.lastX, this.lastY, currentX, currentY, strokeColor, width);
            this.localStrokes.push({
                startX: this.lastX,
                startY: this.lastY + window.scrollY,
                endX: currentX,
                endY: currentY + window.scrollY,
                width: width,
                color: strokeColor
            });
            this.lastX = currentX;
            this.lastY = currentY;
        }
    }
}

const DRAWING_STATE = {
    mousedown: function (e) {
        strokes.isDrawing = true;
        strokes.lastX = e.clientX
        strokes.lastY = e.clientY

    },

    mousemove: function (e) {
        strokes.drawLine(e, SKETCH_CANVAS)
    },

    mouseup: function () {

        strokes.isDrawing = false;
        //strokes.strsaveStrokes();
    },
    mouseleave: function () {

        strokes.isDrawing = false;
        //strokes.saveStrokes();
    }
}

/* 

    const sketchData = JSON.parse(localStorage.getItem('sketch_data'));
    const strokes = sketchData ? sketchData.strokes ? sketchData.strokes : [] : []
    strokes.forEach(stroke => drawLine(context, stroke.startX, stroke.startY - window.scrollY,
      stroke.endX, stroke.endY - window.scrollY, stroke.color, stroke.width))
*/