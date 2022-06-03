const fileInput = document.getElementById('file-input')

fileInput.addEventListener('change', (event) => {
    if(event.target.files) {
        const file = event.target.files[0]
        const reader  = new FileReader()

        reader.onloadend = (e) => {
            const image = new Image()
            image.src = e.target['result']
            image.onload = function(ev) {
                const canvas = document.getElementById('canvas')
                canvas.width = image.width
                canvas.height = image.height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(image, 0, 0)
            }
        }
        reader.readAsDataURL(file)
    }
})
