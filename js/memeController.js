'use strict'

var flagDownload = true



function renderMeme(image) {
    const meme = getMeme()
    document.querySelector('.gallery-container').classList.add("hidden")
    console.log('image', image)

    const img = new Image()
    var currImg = gImgs.find(imag => imag.id === meme.selectedImgId)
    img.src = currImg.url
    console.log('currImg.url', currImg.url)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach((line) => {
            gCtx.beginPath()
            gCtx.fillStyle = line.color
            gCtx.font = `${line.size}px serif`
            gCtx.textAlign = 'left'
            gCtx.textBaseline = 'top'
            if (gIndex === line.index && flagDownload) {
                var textWidth = gCtx.measureText(line.txt).width
                var textHeight = parseInt(gCtx.font)
                var rectX = line.x
                var rectY = line.y
                var rectWidth = textWidth
                var rectHeight = textHeight
                gCtx.rect(rectX, rectY, rectWidth, rectHeight)
                gCtx.strokeStyle = 'black'
                gCtx.lineWidth = 1
                gCtx.stroke()
            }
            gCtx.strokeText(line.txt, line.x, line.y, 250)
            gCtx.fillText(line.txt, line.x, line.y)

        })
    }
}


function renderLine(meme) {
    var texts = meme.lines
    texts.forEach(() => {
        gCtx.font = texts[1] + 'px'
        gCtx.fillStyle = texts[2]
        gCtx.strokeText(texts[0], 10, 50)
    })
}
function onSetLineText() {
    var elInput = document.querySelector('input[name="meme"]')
    var text = elInput.value
    setLineTxt(text)
    renderMeme()
}

function onSetColor() {
    var elInput = document.querySelector('input[name="color"]')
    var color = elInput.value
    setColor(color)
    renderMeme()
}

function downloadImg(elLink) {
    flagDownload = false
    renderMeme()
    setTimeout(()=>{
        download(elLink)
        flagDownload = true


    },1000)


}
function download(elLink){
    const imgContent = gCanvas.toDataURL('image/jpeg')
    console.log('imgContent', imgContent)
    elLink.href = imgContent

}
function removeREC() {
    // var textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    // var textHeight = parseInt(gCtx.font)
    // var rectX = gMeme.lines[gMeme.selectedLineIdx].x
    // var rectY = gMeme.lines[gMeme.selectedLineIdx].y
    // var rectWidth = textWidth
    // var rectHeight = textHeight
    // gCtx.clearRect(rectX, rectY, rectWidth, rectHeight)
    flagDownload = false
    // renderMeme()
    renderMeme()
    flagDownload = true
}



function onChangeSize(val) {
    setChange(val)
    renderMeme()
}
function onAddLine() {
    addLine()
    renderMeme()
}
function onSwitchLine() {
    switchLine()
    renderMeme()
}
function onImgInput(ev) {
    loadImageFromInput(ev, renderFromUpload)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image() 
        img.src = event.target.result 
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) 
}
function renderFromUpload(img){
    console.log('img.url',img)
    var newImg = createImg(gImgs[gImgs.length - 1].id + 1,img.src)
    gImgs.push(newImg)
    setMemeImg(newImg.id)
    renderMeme()
    }
    function onUploadImg() {
        // Gets the image from the canvas
        const imgDataUrl = gCanvas.toDataURL('image/jpeg') 
    
        function onSuccess(uploadedImgUrl) {
            // Handle some special characters
            const url = encodeURIComponent(uploadedImgUrl)
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
        }
        
        // Send the image to the server
        doUploadImg(imgDataUrl, onSuccess)
    }
    
    // Upload the image to a server, get back a URL 
    // call the function onSuccess when done
    function doUploadImg(imgDataUrl, onSuccess) {
        // Pack the image for delivery
        const formData = new FormData()
        formData.append('img', imgDataUrl)
    
        // Send a post req with the image to the server
        const XHR = new XMLHttpRequest()
        XHR.onreadystatechange = () => {
            // If the request is not done, we have no business here yet, so return
            if (XHR.readyState !== XMLHttpRequest.DONE) return
            // if the response is not ok, show an error
            if (XHR.status !== 200) return console.error('Error uploading image')
            const { responseText: url } = XHR
            // Same as
            // const url = XHR.responseText
    
            // If the response is ok, call the onSuccess callback function, 
            // that will create the link to facebook using the url we got
            console.log('Got back live url:', url)
            onSuccess(url)
        }
        XHR.onerror = (req, ev) => {
            console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
        }
        XHR.open('POST', '//ca-upload.com/here/upload.php')
        XHR.send(formData)
    }

    document.getElementById('colorPicker').addEventListener('change', function() {
        var colorValue = this.value;
        // Do something with the selected color value
        console.log(colorValue);
      });

