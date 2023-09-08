const DRAWING_STATE = {
    mouseup: function () {

    },
    mousemove: function () {
        if (strokes.isDrawing) {
            const { scrollX, scrollY } = window
            const { clientX, clientY } = e
            var currentX = clientX - canvas.offsetLeft + scrollX;
            var currentY = clientY - canvas.offsetTop + scrollY;

            drawLine(context, lastX, lastY, currentX, currentY, strokeColor, width);
            local_strokes.push({
                startX: lastX,
                startY: lastY + window.scrollY,
                endX: currentX,
                endY: currentY + window.scrollY,
                width: width,
                color: strokeColor
            });
            lastX = currentX;
            lastY = currentY;
        }
    },

    mouseup: function () {
        isDrawing = false;
        saveStrokes();
    },
    mouseleave: function () {
        isDrawing = false;
        saveStrokes();
    }
}

let strokes = {
    storedStrokes: [],
    tempstrokes: [],
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    strokeColor: '#000000',
    lineWidth: 3,
    drawStrokes: function (context, startX, startY, endX, endY, color, width) {
        if (startY > 0 && endY > 0 && startY < window.innerHeight && endY < window.innerHeight) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.strokeStyle = "black";
            context.lineWidth = width
            context.stroke();
        }
    },
    getStoredStrokes: function () {

    }
}