'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    renderImgs()
}
function renderImgs() {
    var imgs = getImgs()
    var elGallery = document.querySelector('.gallery')
    var strHtml = imgs.map(img => `<img class="grid-Item" onclick="onSelect(${img.id})" src="${img.url}">`).join('')
    elGallery.innerHTML = strHtml
}
function onSelect(imgId) {
    document.querySelector('.canvas-container').classList.remove("hidden")
    setMemeImg(imgId)
    renderMeme()
}
function showGallery(){
    document.querySelector('.canvas-container').classList.add("hidden")
    document.querySelector('.gallery-container').classList.remove("hidden")



}