let com = 0
let elements = 0
const myImage = [0,7]
let i = 0
let basicImage
let x
let y
let iterator = 0

 

function preload(){
   myImage[0] = loadImage("../assets/meme-home-1.png");
   myImage[1] = loadImage("../assets/meme-home-2.png");
   myImage[2] = loadImage("../assets/meme-home-3.png");
   myImage[3] = loadImage("../assets/meme-home-4.png");
   myImage[4] = loadImage("../assets/meme-home-5.png");
   myImage[5] = loadImage("../assets/meme-home-6.png");
   myImage[6] = loadImage("../assets/meme-home-7.png");
   myImage[7] = loadImage("../assets/meme-home-8.png");
   basicImage = loadImage("../assets/meme-home-vuoto.png");
}
 

function setup() {
   newCanvas()
   frameRate(6);
  
   console.log(frameCount)
   //let a = select('#homepage_button');
   //a.position(windowWidth/1.15, windowHeight/1.15) // posizione bottone
 }
 
 function draw () {
   if (frameCount<36) {
      drawImages()
    } else if (frameCount==36){
      reset()
      frameCount++
      
    }
 }


 
 function drawImages() {
   //let testoHome = selectClass('big-text-in');
   //testoHome.position(50, 0);
 
   iterator = iterator + 10;
   x = noise(iterator + 500) * 1000;
   //let x = iterator*10;
   y = noise(iterator + 200) * 1000 - windowHeight/2;
   com ++
   image(basicImage, x, y, 512, 288)

   if(random()<0.7)
   {
      fill(255,0,0);
   } else {
      randomImage(); 
   }

   /*
   if (frameCount == 36) {
      reset();
      frameCount == 0
  }
  */
}
 


function randomImage () {
  if (i=floor(random(0,8))) {
      console.log(i);
      image(myImage[i], x, y, 512, 288);
      i==0;
   } 
}

function reset() {
   newCanvas()
   frameCount == 0;  
   frameCount ++
}

function newCanvas() {
   let cnv = createCanvas(windowWidth, windowHeight);
   cnv.position(0,0)
}
       


