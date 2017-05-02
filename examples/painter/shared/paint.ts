import {IPaintEvent} from './../protocol/service'
const Canvas = require('canvas')
import * as LRUCache from 'lru-cache'

export const canvasWidth = process.env['CANVAS_WIDTH'] ? parseInt(process.env['CANVAS_WIDTH']) : 2048
export const canvasHeight = process.env['CANVAS_HEIGHT'] ? parseInt(process.env['CANVAS_HEIGHT']) :2048

export const brushSize = 124
const brushCache = LRUCache<HTMLCanvasElement>({max: 20})
const brushImage = new Canvas.Image()
brushImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB8CAYAAABE3L+AAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QjlEQzM5MEMzQTAxMUUwQkU3QUFBOUY2M0QzMUI1MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QjlEQzM5MUMzQTAxMUUwQkU3QUFBOUY2M0QzMUI1MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMjhBRDU3QzM2RjExRTBCRTdBQUE5RjYzRDMxQjUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBMjhBRDU4QzM2RjExRTBCRTdBQUE5RjYzRDMxQjUzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VTkSEgAAGLFJREFUeNrsXe1y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'

let brushData: Uint8ClampedArray

function createCanvas(width: number, height: number):HTMLCanvasElement {
    if (process.title === 'browser') {
        const rv = document.createElement('canvas')
        rv.width = width
        rv.height = height
        return rv
    } else {
        return new Canvas(width, height)
    }
}

function getBrush(color: number):HTMLCanvasElement {
    if (brushCache.has(color)) {
        return brushCache.get(color)
    }

    const r = (color >> 16) & 0xff
    const g = (color >> 8) & 0xff
    const b = color & 0xff

    const brush = createCanvas(brushSize, brushSize)
    const ctx = brush.getContext('2d')

    if (!brushData) {
        ctx.drawImage(brushImage, 0, 0)
        brushData = ctx.getImageData(0, 0, brushSize, brushSize).data
    }

    const imageData = ctx.createImageData(brushSize, brushSize)

    for (let i = 0; i < brushData.length; i+=4) {
        imageData.data[i]   = r
        imageData.data[i+1] = g
        imageData.data[i+2] = b
        imageData.data[i+3] = brushData[i+3]
    }

    ctx.putImageData(imageData, 0, 0)

    brushCache.set(color, brush)
    return brush
}

export function paint(event: IPaintEvent, ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 0.4
    ctx.globalCompositeOperation = 'source-over'

    if (event.size < 1 || event.size > brushSize) {
        throw new Error('Invalid size')
    }

    if (Math.abs(event.x) > 0xffff || Math.abs(event.y) > 0xffff) {
        throw new Error('Invalid position')
    }

    if (event.color > 0xffffff) {
        throw new Error('Invalid color')
    }

    const offset = ~~(event.size / 2)
    const x = ~~(event.x - offset)
    const y = ~~(event.y - offset)
    const s = ~~event.size

    ctx.drawImage(getBrush(event.color), x, y, s, s)
}
