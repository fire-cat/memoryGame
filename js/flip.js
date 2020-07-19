let scaleX = 100;
let scaleDirection = -1;
let scaleDelta = 8;
let animationFunction = null;
let context;
let requestID;
let canvasWidth, canvasHeight;
let front, back;
let correctGuess = 0;
function flip(first, second, action, canv){
    context = canv.getContext("2d");
    canvasWidth = canv.width;
    canvasHeight = canv.height;
    front = first;
    back = second;
    switch (action) {
        case 'open':
        {
            scaleX = 100;
            animationFunction = flipOpen;
            scaleDirection = -1;
            break;
        }
        case 'close':
        {
            scaleX = -100;
            animationFunction = flipClose;
            scaleDirection = -1;
            break;
        }
    }
    animate();
}

function flipOpen(x, y, scaleX){
    context.clearRect(0,0, canvasWidth, canvasHeight);
    context.translate(x,0);
    context.scale(scaleX,1);
    if(scaleX >= 0){
        context.drawImage(front, 0, 0, canvasWidth, canvasHeight);
    }else{
        context.drawImage(back, 0, 0, canvasWidth, canvasHeight);
        if (scaleX  == -1) {
            context.drawImage(back, 0, 0, canvasWidth, canvasHeight);
            cancelAnimationFrame(requestID);
        }
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
}

function flipClose(x, y, scaleX){
    context.clearRect(0,0, canvasWidth, canvasHeight);
    context.translate(x, 0);
    context.scale(scaleX, 1);
    if(scaleX <= 0){
        context.drawImage(back, 0, 0, canvasWidth, canvasHeight);
    }else{
        context.drawImage(front, 0, 0, canvasWidth, canvasHeight);
        if (scaleX  == 1) {
            context.drawImage(front, 0, 0, canvasWidth, canvasHeight);
            context.setTransform(1, 0, 0, 1, 0, 0);
            cancelAnimationFrame(requestID);
        }
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
}

function animate(direction){
    requestID = requestAnimationFrame(animate);
    animationFunction((canvasWidth - canvasWidth * scaleX / 100) / 2, 0,  scaleX / 100);
    scaleX += scaleDirection * scaleDelta;
    if(scaleX < -100 || scaleX > 100){
        scaleDirection *= -1;
        scaleX += scaleDirection*scaleDelta;
    }
}
