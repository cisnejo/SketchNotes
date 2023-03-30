export function sizeCanvas(canvas, strokes) {
    const { width, height } = document.body.getBoundingClientRect()
    const largestItem = Array.from(document.getElementsByTagName("*")).reduce((acc, curr) => {
        const { width: currWidth, height: currHeight } = curr.getBoundingClientRect()
        if (currWidth > acc.width) acc.scrollWidth = currWidth
        if (currHeight > acc.height) acc.scrollHeight = currHeight
        return acc
    }, { height: height, width: width })
    canvas.width = largestItem.width
    canvas.heights = largestItem.height



    AddCanvasFunctions(canvas, strokes)

}

export function AddCanvasFunctions(canvas, strokes) {
    const context = canvas.getContext('2d')
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let local_strokes = [];
    let strokeColor = "#000000";
    let width = 1;

    // Load saved strokes
    strokes.forEach((stroke) => {
        drawLine(
            stroke.startX,
            stroke.startY,
            stroke.endX,
            stroke.endY,
            stroke.color,
            stroke.width
        )
    }


    );

    canvas.addEventListener("mousedown", function (e) {
        isDrawing = true;

        lastX = e.pageX - canvas.offsetLeft;
        lastY = e.pageY - canvas.offsetTop;
    });

    canvas.addEventListener("mousemove", function (e) {
        if (isDrawing) {
            var currentX = e.pageX - canvas.offsetLeft;
            var currentY = e.pageY - canvas.offsetTop;
            drawLine(lastX, lastY, currentX, currentY, strokeColor, width);
            local_strokes.push({
                startX: lastX,
                startY: lastY,
                endX: currentX,
                endY: currentY,
                width: width,
                color: strokeColor,
            });

            lastX = currentX;
            lastY = currentY;
        }
    });

    canvas.addEventListener("mouseup", function () {
        isDrawing = false;
        saveStrokes();
    });

    canvas.addEventListener("mouseleave", function () {
        isDrawing = false;
    });

    function drawLine(startX, startY, endX, endY, color, width) {
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = color;
        context.lineWidth = width;
        context.stroke();
    }

    function saveStrokes() {
        let current_strokes = JSON.parse(localStorage.getItem("strokes")) || [];
        let save_strokes = current_strokes.concat(local_strokes);
        localStorage.setItem("strokes", JSON.stringify(save_strokes));
        local_strokes = [];
    }

    return strokes;
}
