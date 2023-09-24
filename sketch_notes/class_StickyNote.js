


function CreateStickyNotes(canvas, stickyData) {
    if (canvas.getContext) {
        /** @type {CanvasRenderingContext2D} */
        stickyData.forEach(sticky => {
            const { x, y, w, h, color } = sticky
            const context = canvas.getContext('2d')
            context.beginPath();
            context.fillStyle = color
            context.fillRect(x, y, w, h);
            context.stroke();
        })

    }
}