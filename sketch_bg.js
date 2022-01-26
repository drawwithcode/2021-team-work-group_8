let com = 0
let elements = 0
const myImage = [0,3]
let i = 0
let basicImage
 
 
 
 
 
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
  
   createCanvas(windowWidth, windowHeight);
   frameRate(6);
   let a = select('#homepage_button');
   a.position(windowWidth/1.15, windowHeight/1.15) // posizione bottone
  
 }
 
 
 var iterator = 0 ;
 
 function draw() {
   let testoHome = select('#testo-home');
   testoHome.position(50, 0);
 
   iterator = iterator + 100;
   var x = noise(iterator + 500) * 1000;
   //let x = iterator*10;
   let y = noise(iterator + 200) * 1000 - windowHeight/2;
   com ++
   if (frameCount == 48) {
       reset();
   }
   image(basicImage, x, y, 512, 288)
   if(random()<0.7)
   {
      fill(255,0,0);
   } else {
      randomImage();
     
   }
 
 
function randomImage () {
if (i=floor(random(0,9))) {
      
 console.log(i);
 image(myImage[i], x, y, 512, 288);
 i==0;
}
}
  }
 
  
 function reset () {
   createCanvas(windowWidth, windowHeight);
   frameCount = 0;
   }
       
