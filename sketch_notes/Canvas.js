class CANVAS {
    constructor(canvas) {
        this.canvas = canvas
        this.context = null
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
        this.canvasSettings = {
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '100000',
            backgroundColor: 'none'

        }

    }

    ResizeCanvas(newWidth, newHeight) {
        this.canvas.width = newWidth
        this.canvas.height = newHeight
    }

    StyleCanvas() {
        Object.assign(this.canvas, this.canvasSettings)
    }

    AppendCanvas() {
        document.body.append(this.canvas)
    }
}

const SKETCH_CANVAS = new CANVAS(document.createElement('canvas'))
SKETCH_CANVAS.ResizeCanvas(window.innerWidth, window.innerHeight)
SKETCH_CANVAS.StyleCanvas()
