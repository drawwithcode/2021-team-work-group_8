const myImage = [0,5]

let iterator = 0
let i = 0
let com = 0
let elements = 0

let x
let y

// HTML elements
let a
let b
let cnv
let cnv2

 
// sketch works as sketch_bg.js
function preload(){
   myImage[0] = loadImage("../assets/icona-bg1.png");
   myImage[1] = loadImage("../assets/icona-bg2.png");
   myImage[2] = loadImage("../assets/icona-bg3.png");
   myImage[3] = loadImage("../assets/icona-bg4.png");
   myImage[4] = loadImage("../assets/icona-bg5.png");
   myImage[5] = loadImage("../assets/icona-bg6.png");
}
 

function setup() {
   frameRate(6);
   cnv2 = createCanvas(windowWidth, windowHeight);
   cnv2.position(0,0)
   a = select('#homepage_button')
   b = select("#over-sketch2");
  // console.log('HTML elements ok')
}

 
 function draw () {
    iterator = iterator + 100;
    var x = noise(iterator + 1000) * 2000;
    let y = noise(iterator + 500) * 2000 - windowWidth/2;
    com ++
    if (frameCount == 24) {
        reset();
        }
    randomImage()
    b.show()
   
    
    function randomImage () {
        if (i=floor(random(0,6))) {
            console.log(i);
            image(myImage[i], x, y, 100, 100);
            i==0;
            } 
    } 
}
 
function reset () {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0,0)
    frameCount = 0;
}

      
