'use strict'

var gCount = 1
var gCountMeme = 1
var gImgs
var gMemes
var gIndex = 0
createImgs()

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            x: 30,
            y: 50,
            index:0
        },
        {
            txt: 'mskfwgwg',
            size: 20,
            color: 'red',
            x: 30,
            y: 70,
            index:1
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function setMemeImg(id) {
    gMeme.selectedImgId = id
    console.log(gMeme)
}

function createImg(id = gCount,url =  `img/${gCount++}.jpg`) {
    var img = {
        id,
        url,
        keywords: []
    }
    return img
}
function createImgs() {
    gImgs = []
    for (var i = 0; i < 18; i++) {
        var currImg = createImg()
        console.log('gCount', gCount)
        gImgs.push(currImg)
    }
    return gImgs
}
function getImgs() {
    return gImgs
}
function getMeme() {
    console.log(gMeme)
    return gMeme
}
function setLineTxt(text) {
    console.log('text', text)
    console.log('gMeme', gMeme)
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function setChange(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
}
function addLine() {
    var line =
    {
        txt: '',
        size: 20,
        color: 'red',
        x: gMeme.lines[gMeme.lines.length - 1].x,
        y: gMeme.lines[gMeme.lines.length - 1].y + 20,
        index:gMeme.lines.length
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    gIndex = gMeme.lines.length - 1
}
function switchLine() {
    if (gMeme.lines.length - 1 === gIndex)
        gIndex = 0
    else
        gIndex++
    gMeme.selectedLineIdx = gIndex
}


