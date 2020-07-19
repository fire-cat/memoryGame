const fieldwidth = 640;
const fieldHeigth = 320;
let gameGrid = document.getElementById('game-grid');
let rows = 4;
let colls = 3;
let cellWidth = fieldwidth/rows;
let cellHeight= fieldHeigth/colls;
let cover = document.getElementById('cover');
let currentCanvas;
let cards = [];
let clicks = 0;
const images = new Map();

function start() {
    document.getElementById('win').classList.toggle('nowin');
    gameGrid.innerHTML = '';
    rows = document.getElementById('rows').value;
    colls = document.getElementById('colls').value;
    generateCards();
    createGameGrid();
}


function createGameGrid() {
    for (var i = 0; i < colls; i++) {
        let tr = gameGrid.insertRow(0);
        tr.style.setProperty("height", `${Math.floor(cellHeight)}px`);
        for (var j = 0; j < rows; j++) {
            let td = tr.insertCell(0);
            td.style.setProperty("height", `${Math.floor(cellHeight)}px`);
            let canvas = document.createElement('canvas');
            canvas.id = `td${i}${j}`;
            let cardId  = cards.pop();
            images[canvas.id] = {opened:false, imageID:cardId};
            console.log(cardId);
            canvas.width = cellWidth;
            canvas.height = cellHeight;
            drawCardBackground(canvas, cardId);
            canvas.addEventListener('click', handleClick);
            td.appendChild(canvas);
        }
    }
}

function drawCardBackground(canvas, image) {
    var img = new Image();   // Создает новое изображение
    img.addEventListener("load", function() {
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0,0, cellWidth, cellHeight);
        ctx.drawImage(cover, 0,0, cellWidth, cellHeight);

        images[canvas.id].image = img;

    }, false);
    img.src = `assets/${image}.jpg`;
}

function handleClick(event) {
    document.getElementById('no-of-clicks').textContent = ++clicks;
    if (currentCanvas && event.target.id  === currentCanvas.id) {
        flip(  cover, images[currentCanvas.id].image, "close", currentCanvas);
        return;
    }
    if (currentCanvas && images[event.target.id].imageID === images[currentCanvas.id].imageID) {
        document.getElementById('correct-guess').textContent = ++correctGuess;
        if (correctGuess >= rows*colls/2) {
            document.getElementById('win').classList.toggle('nowin');
        }
        clearCard(event.target);
        clearCard(currentCanvas );
        flip(cover, images[event.target.id].image, "open", event.target);
        currentCanvas = null;
    } else {
        if (currentCanvas) {
            flip(  cover, images[currentCanvas.id].image, "close", currentCanvas);
        }

        currentCanvas = event.target;
        setTimeout( function () {
            currentCanvas = event.target;
            flip(cover, images[event.target.id].image, "open", event.target);
            }, 500);

        //flip(cover, images[event.target.id].image, "open", event.target);
    }
}

function generateCards() {
    let pairs = colls*rows/2;
    let images = [];
    let min = 1;
    let max = 52;
    for (let i = 1; i <= pairs; i++) {
        let index = Math.floor(min + Math.random() * (max + 1 - min));
        while (images.indexOf(index) >= 0) {
            index = Math.floor(min + Math.random() * (max + 1 - min));
        }
        images.push(index);
    }
    cards = shuffle(images.concat(images.reverse()));
    console.log(cards);
}

function shuffle(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function clearCard(target) {
    images[target.id].opened = true;
    target.removeEventListener('click', handleClick);
}


function updateRows(event) {
    rows = event.target.value;
}

function updateColls(event) {
    colls = event.target.value;
}