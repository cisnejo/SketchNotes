class CANVAS {
    constructor(canvas) {
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.display = 'none'
        this.windowHeight = window.innerHeight
        this.windowWidth = window.innerWidth
        this.styles = {
            display: this.display,
            position: 'absolute',
            left: '0px',
            top: '0px',
            zIndex: '100000',
            backgroundColor: 'none'
        }
    }

    ToggleCanvas() {
        this.display = this.display == 'none' ? 'block' : 'none'
        this.styles = { ...this.styles, display: this.display }
        this.StyleCanvas(this.styles);
    }
    ClearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    ResizeCanvas(newWidth, newHeight) {
        this.canvas.width = newWidth
        this.canvas.height = newHeight
    }

    ScrollCanvas(scrollY) {
        this.styles = { ...this.styles, top: `${scrollY}px` }
        this.StyleCanvas(this.styles)
    }

    StyleCanvas(newSetting) { Object.assign(this.canvas.style, newSetting) }
    AppendCanvas() { document.body.append(this.canvas) }
}

const SKETCH_CANVAS = new CANVAS(document.createElement('canvas'))
document.body.append(SKETCH_CANVAS.canvas)
SKETCH_CANVAS.ResizeCanvas(window.innerWidth, window.innerHeight)

SKETCH_CANVAS.StyleCanvas()


SKETCH_CANVAS.canvas.addEventListener('mousedown', (e) => {
    CONTROL_STATE.mousedown(e)
})

SKETCH_CANVAS.canvas.addEventListener('mousemove', (e) => {
    CONTROL_STATE.mousemove(e)
})

SKETCH_CANVAS.canvas.addEventListener('mouseup', (e) => {
    CONTROL_STATE.mouseup(e)
})

SKETCH_CANVAS.canvas.addEventListener('mouseleave', (e) => {
    CONTROL_STATE.mouseleave(e)
})


