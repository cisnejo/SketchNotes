
let strokes = {
    localSketchData: { strokes: [], stickies: [] },
    localStrokes: [],
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    currentX: 0,
    currentY: 0,
    strokeColor: '#000000',
    lineWidth: 3,
    drawStrokes: function (startX,startY,endX,endY,strokeColor, strokeWidth) {
        const { context } = SKETCH_CANVAS

        if (startY>= 0 && endY >= 0 && startY<= window.innerHeight && endY <= window.innerHeight) {
            context.beginPath();
            context.moveTo(startX ,startY);
            context.lineTo(endX, endY);
            context.strokeStyle = strokeColor;
            context.lineWidth = strokeWidth
            context.stroke();
        }
    },
    getStoredStrokes: function () {
        return JSON.parse(localStorage.getItem('sketch_data'))
    },
    saveStrokes: function () {

        let allStrokes  = this.localStrokes.concat(this.getStoredStrokes().strokes)
        this.localSketchData = { ...this.localSketchData, strokes: allStrokes }

        localStorage.setItem('sketch_data', JSON.stringify({ ...this.getStoredStrokes(), strokes: this.localSketchData.strokes }))
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



            this.drawStrokes(this.lastX,this.lastY,this.currentX,this.currentY,strokeColor, strokeWidth);
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
        strokes.isDrawing = true;
        strokes.lastX = e.clientX
        strokes.lastY = e.clientY

    },

    mousemove: function (e) {
        strokes.drawLine(e)
    },

    mouseup: function () {
        console.log('mouse up')
        strokes.isDrawing = false;
        strokes.saveStrokes();
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