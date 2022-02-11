const myImage = [0,7]
let basicImage

let x
let y
let com = 0
let elements = 0
let i = 0
let iterator = 0

//HTML elements
let a
let b
let cnv
let cnv2


function preload(){
   myImage[0] = loadImage("../assets/meme1.png");
   myImage[1] = loadImage("../assets/meme2.png");
   myImage[2] = loadImage("../assets/meme3.png");
   myImage[3] = loadImage("../assets/meme4.png");
   myImage[4] = loadImage("../assets/meme5.png");
   myImage[5] = loadImage("../assets/meme6.png");
   myImage[6] = loadImage("../assets/meme7.png");
   myImage[7] = loadImage("../assets/meme8.png");
   basicImage = loadImage("../assets/png-vuoto.png");
   //console.log('images loaded')
}
 

function setup() {
   frameRate(6);
   cnv2 = createCanvas(windowWidth, windowHeight);
   cnv2.position(0,0)
   a = select('#homepage_btn');
   a.position(100, 425)
   b = select('#homepage_text')
   //console.log('buttons ok')
 }

 
function draw () {
   iterator = iterator + 100;
   let x = noise(iterator + 500) * 1000 + 250;
   let y = noise(iterator + 200) * 1000 - windowHeight/2 + 100;
   com ++
   if (frameCount == 18) {
         reset();
      }
      image(basicImage, x, y, 512, 288)

   if(random()<0.8)  {
         fill(255,0,0);
   } else {
         randomImage();
         b.show()
    }
   

   function randomImage () {
      if (i=floor(random(0,8))) {      
         console.log(i);
         image(myImage[i], x, y, 512, 288);
         i==0;
         } 
      } 

}
 
function reset () {
   // to restart the sketch over and over again
   cnv = createCanvas(windowWidth, windowHeight);
   cnv.position(0,0)
   frameCount = 0;
}

      

