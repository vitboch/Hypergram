const fileInput = document.getElementById('file-input')
const brightness = document.getElementById('brightness')
const contrast = document.getElementById('contrast')
const transparent = document.getElementById('transparent')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const image = new Image()

fileInput.addEventListener('change', (event) => {
    if(event.target.files) {
        const file = event.target.files[0]
        const reader  = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = (e) => {
            image.src = e.target['result']
            image.onload = () => {
                canvas.width = image.width
                canvas.height = image.height
                ctx.drawImage(image, 0, 0)
            }
        }
    }
})

function truncate(value) {
    if (value < 0) {
        return 0
    } else if (value > 255) {
        return 255
    } else {
        return value
    }
}

brightness.addEventListener('change', () => change())
contrast.addEventListener('change', () => change())
transparent.addEventListener('change', () => change())

function change() {
    const valueBrightness = parseInt(brightness.value)
    const valueContrast = parseInt(contrast.value)
    const valueTransparent = parseFloat(transparent.value)

    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    const factor = 259 * (255 + valueContrast) / (255 * (259 - valueContrast))
    pixels.forEach((pixel, index) => {
        if (index % 4 === 0) {
            pixels[index] = truncate(factor * (pixel - 128) + 128 + valueBrightness)
        }
        if (index % 4 === 1) {
            pixels[index] = truncate(factor * (pixel - 128) + 128 + valueBrightness)
        }
        if (index % 4 === 2) {
            pixels[index] = truncate(factor * (pixel - 128) + 128 + valueBrightness)
        }
    })

    if (valueTransparent !== 1) {
        pixels.forEach((pixel, index) => {
            if (index % 4 === 3) {
                pixels[index] = pixel * valueTransparent
            }
        })
        pixels.forEach((pixel, index) => {
            pixels[index] = truncate(pixel)
        })
    }
    imageData.data = pixels
    ctx.putImageData(imageData, 0, 0)
}
