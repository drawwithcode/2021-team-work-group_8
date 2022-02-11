let b 
let div
let mic, recorder, soundFile;
let state;
let start_fc,stop_fc,duration_fc
let button1
let button2
let action_state=-1
let has_started=false
let has_stopped =false
let new_spectrum
let dotDrawn = false
let durationRec=0
let maxDuration=500
let durationStat
let analyze=false
let analyzing = 0
let startAnalyze
let databaseLoaded = false
let button3
let buttonStop
let buttonNext
let buttonPrevious
let buttonNext1
let buttonPrevious1
let graph=1
let p
let show=false
let show1 = false
let show2 = true
let Y1label
let Y2label
let X1label
let X2label
let graphLabel
let profileN
let textN
let volumeStat
let speedStat
let pitchStat
let maxVal = 200
let meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8
profiles = []
texts =  []
let angle = 0
let cnv3
function preload() {
  meme1 = loadImage('assets/meme1.png');
  meme2 = loadImage('assets/meme2.png');
  meme3 = loadImage('assets/meme3.png');
  meme4 = loadImage('assets/meme4.png');
  meme5 = loadImage('assets/meme5.png');
  meme6 = loadImage('assets/meme6.png');
  meme7 = loadImage('assets/meme7.png');
  meme8 = loadImage('assets/meme8.png');
  text1 = loadImage('assets/meme1scritta.png');
  text2 = loadImage('assets/meme2scritta.png');
  text3 = loadImage('assets/meme3scritta.png');
  text4 = loadImage('assets/meme4scritta.png');
  text5 = loadImage('assets/meme5scritta.png');
  text6 = loadImage('assets/meme6scritta.png');
  text7 = loadImage('assets/meme7scritta.png');
  text8 = loadImage('assets/meme8scritta.png');
  
  star = loadImage('assets/asterisco-bianco.png');
  enter = loadImage('assets/enter-arrow.png');
  smile = loadImage('assets/smile-white.png');
  questionmark = loadImage('assets/question-mark-white.png');
  starblue = loadImage('assets/star-blue.png');
  littlesmile = loadImage('assets/little-smile.png');
  backsmall = loadImage('assets/back-small.png');
  backbig = loadImage('assets/back-big.png');
  meme1graph = loadImage('assets/meme1-V2.png');
  meme1scritta = loadImage('assets/meme1scritta.png');
  iconabg1 = loadImage('assets/icona-bg1.png')
  iconabg2 = loadImage('assets/icona-bg2.png')
  iconabg4 = loadImage('assets/icona-bg4.png')

}

function setup() {
  
  profiles = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8]
  texts = [text1, text2, text3, text4, text5, text6, text7, text8]
  PS1 = [meme3, meme2]
  PS2 = [meme4, meme8]
  PS3 = [meme1, meme7]
  PS4 = [meme5, meme6]
  SV1 = [meme6, meme7]
  SV2 = [meme4, meme3]
  SV3 = [meme1, meme5]
  SV4 = [meme2, meme8]
  VP1 = [meme5, meme8]
  VP2 = [meme4, meme6]
  VP3 = [meme1, meme2]
  VP4 = [meme3, meme7]
  angleMode(DEGREES);
 
  cnv = createCanvas(windowWidth, windowHeight);
  
  
  //cnv.mousePressed(canvasPressed);
  background(220);
  textAlign(CENTER, CENTER);
  // create an audio in
  mic = new p5.AudioIn();
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
}
function draw(){
 // console.log(action_state)
  
 // button2.mouseClicked(canvasPressed)
  userStartAudio();
  //console.log(action_state)
  // make sure user enabled the mic
  
if(action_state==-1){
  if(buttonNext1 && buttonPrevious1){
    buttonNext1.hide()
    buttonPrevious1.hide()
  }
  if(!button2){
  button2=createButton("!!!")
    button2.position(850, 100);
    button2.addClass('button-symbol-white');
    button2.mouseClicked(next)
    
  }
  else if(button2){
    button2.show()
  }
  background("#1d3fd6")
  fill(255)
  show1=false
  /*
    font-size: 108px;
  margin: 0px;
  
  line-height: 96px;
  background: none;
*/ 
  textSize(108)
  textAlign(LEFT)
  textLeading(96)
  text('CLICK ON      !!!\nAND READ OUT\nLOUD    THE SENTENCE\nTHAT WILL APPEAR\nON THE    SCREEN', 50, 300);
  image(star, 480, 450, 82, 82)
  image(enter, 590, 62, 125, 85)
  image(smile, 365, 255, 86, 86)
}
  if(action_state === 0 && mic.enabled && has_started===false){
    button2.hide()
    if(!buttonStop){
      buttonStop=createButton(">")
      buttonStop.position(width/4*3, height/3);
      buttonStop.addClass('button-symbol-white');
      buttonStop.mouseClicked(next)
      }
      else if(buttonStop){
        buttonStop.show()
      }
    has_started=true
    recorder.record(soundFile);
    start_fc = frameCount
    background('#1d3fd6');
    textSize(30)
    fill(255)
    show1=false
    label2 = 2
    fill(255)
    textSize(108)
    textLeading(96)
    textAlign(LEFT)
    
    text('TRANSFORM\nMY VOICE \nIN MY TRUEST\nINTERNET\nIDENTITY', 50, 300);
  }
    if (action_state === 0 && has_started==true) {
      durationRec++
     // console.log(durationRec)
    //state++;
    if(durationRec==maxDuration){
      action_state=1
     }
  }
 
  else if (action_state === 1 && has_stopped===false) {
    buttonStop.hide()
    if(!buttonPrevious1){
      buttonPrevious1=createButton("<")
      buttonPrevious1.position(50, 350);
      buttonPrevious1.addClass('button-symbol-white');
      buttonPrevious1.mouseClicked(previous)
      
      
      }
      else if(buttonPrevious1){
        buttonPrevious1.show()
      }
      if(!buttonNext1){
        buttonNext1=createButton(">")
        buttonNext1.position(525, 250);
        buttonNext1.addClass('button-symbol-white');
        buttonNext1.mouseClicked(next)
       
        }
        else if(buttonNext1){
          buttonNext1.show()
        }
    show1=true
    has_stopped=true
    background("#1d3fd6");
    recorder.stop();
    stop_fc = frameCount
    duration_fc = stop_fc-start_fc
    testfp = new Voice_Fingerprint(soundFile,duration_fc)
   // console.log(duration_fc)
    //state++;
  fill(255)
  textSize(102)
  textLeading(96)
  textAlign(LEFT)
  text('RECORDING \n     COMPLETED!', 50, 150);
  image(enter, 52, 150, 125, 85)
  fill(255)
  textSize(102)
  text('ANALYZE', 50, 350)
  fill(255)
  textSize(102)
  text('REGISTER AGAIN', 250, 450)
  
  for (i=0; i<1000; i=i+100) {
    let xsmile = [850, 900, 950, 1000, 1050, 1100, 1150, 1200]
    let ysmile = [100, 250, 270, 300, 500]
    image(smile, random(xsmile), random(ysmile), 86, 86)
    
    }
    
  }
  else if (action_state === 2 && analyze===false) {
    buttonNext1.hide()
    buttonPrevious1.hide()
    
    analyze==true
  //  console.log(analyze)
    
  //  console.log(testfp)
    background('#1d3fd6')
    testfp.analyzer()
    analyzing++
  //  soundFile.play(); //non funziona
  
      // DA TOGLIERE
    //fill(255)
    //textSize(100)
  //textAlign(CENTER)
    //text('ANALYZING...', width/2, height/2);
  push();
  imageMode(CENTER);
  
  
  // Red square at (100, 100)
  
  translate(windowWidth/2, windowHeight/2); 
  rotate(angle);
  //fill('red');
  //rect(0, 0, 50, 50);
  image(questionmark, 0, 0, 200, 200);
  pop(); 
  angle += 5; 
  
  
  
  //  console.log(testfp.has_finished_analyzing)
    if(testfp.has_finished_analyzing===true){
      action_state++
    }
  }
 
  else if (action_state===3){
      if(!buttonNext){
        buttonNext=createButton(">")
        buttonNext.position(width-350, height-325);
        buttonNext.addClass('button-symbol-white');
        buttonNext.mouseClicked(next)
        }
        else if(buttonNext){
          buttonNext.show()
        }
      if(buttonPrevious){
        buttonPrevious.hide()
        //div.hide()
      }
    fill(0)
    
//<<<<<<< HEAD
     
   cnv2 = createCanvas(600, 600);
   //cnv2.position(windowWidth/2-windowHeight/1.65, windowHeight/2-windowHeight/3)
  cnv2.style('border', '4px solid black')
  cnv2.position(300, 100)
   //cnv2.center()
   
   //cnv2.center([horizontal])
//=======
   //cnv2 = createCanvas(800, 500);
  // cnv2.position(windowWidth/2-windowWidth/4, windowHeight/2-windowHeight/3)
   ///cnv2.class('canvas-visual')
   //cnv2.center()
//>>>>>>> c62683a63cf104052f8f7e71108e936216966913
   testfp.display()
  
    
    if(!p){
//<<<<<<< HEAD
    p = createP('CLICK HERE\nTO DOWNLOAD');
    p.addClass('p-download')
    
  
    
/*
    fill(255)
  textSize(102)
  textLeading(96)
  textAlign(LEFT)
  text('RECORDING \n     COMPLETED!', 50, 150);
   // p.position(windowWidth/2, 0);
    
*/
   
//=======
   // p = createP('CLICK HERE TO DOWNLOAD');
    //p.style('font-size', '40px');
    //p.style('text-align', 'center');
   // p.position(windowWidth/2, 0);
 
//>>>>>>> c62683a63cf104052f8f7e71108e936216966913
    }
    else if(p){
      p.show()
    }
    
  }
  
  if (action_state===4){
    p.hide()
    cnv2.style('border', 'none')
    
    
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0,0)
    
    if(!buttonPrevious){
      buttonPrevious=createButton("<")
      buttonPrevious.position(50, height/2-50);
      buttonPrevious.addClass('button-symbol-white');
      buttonPrevious.mouseClicked(previous)
      
      }
      else if(buttonPrevious){
        buttonPrevious.show()
      }
    // prova canvas
   
    buttonNext.show()
    //background(29, 64, 214)
    fill(255)
    textSize(20)
    testfp.profiles()
    //div.show()
if(show==true){
    show = false
    button3.hide()
    button4.hide()
    button5.hide()
    
}
  }
  function next(){
  if(action_state!=2){
    action_state++
  }
    
  }
  if(action_state===5 && dotDrawn==false){
    textAlign(CENTER)
    buttonNext.hide()
   
    
  if(show==false){
    
    show=true
    //div.hide()
    
    button3 = createButton('PITCH/SPEED');
    button3.position(-90, 100);
    button3.mousePressed(pitchSpeed);
    button3.addClass('button-graph');
    button4 = createButton('VOLUME/PITCH');
    button4.position(-90, 150);
    button4.mousePressed(volumePitch);
    button4.addClass('button-graph');
    button5 = createButton('SPEED/VOLUME');
    button5.position(-90, 200);
    button5.mousePressed(speedVolume);}
    button5.addClass('button-graph');
    
   // console.log(graph)
    dotDrawn==true
    background(255)
    // rect per bottoni
    fill(255)
    stroke(0)
    
    // rect per sfondo
    //rectMode(CENTER)
    rect(250, 50, windowWidth-300, windowHeight-100)
    //rect(100, 100, 200, 200)
    //image(backsmall, 100, 100, 350, 330)
    /*
    push()
    translate (windowWidth/2, windowHeight/2)
    imageMode(CENTER)
    //image(backbig, 0, 0, 600, 1100)
    pop()
    */
    stroke(0)
    strokeWeight(4)
    line(350, height/2, width-150, height/2) //500 e -300
    line(width/2+100, 100, width/2+100, height-100) //+0
    noStroke()
    fill(0)
    
    text(Y1label, width/2+100, 80) //50
     text(Y2label, width/2+100, height-80)

    text(X1label, 300, height/2) //250
    text(X2label, width-100, height/2) //-250
    
    /*
    textSize(30)
    fill(0)
    text(graphLabel, 100, 50)
    */
    if(allDots){
    let Gr1 
    let Gr2 
    let Gr3
    let Gr4 
    
      //  console.log(allGreetings)
      for(key in allDots){
      if(graph===3){
        Gr1 = random(PS1);
        Gr2 = random(PS2);
        Gr3 = random(PS3);
        Gr4 = random(PS4);
    
    testfp.graphPS()
    
    X1label="LOW"
    X2label="HIGH"
    Y1label="QUICK"
    Y2label="SLOW"
    graphLabel = "PITCH/SPEED"
      }
      else if(graph===2){
        Gr1 = random(SV1);
        Gr2 = random(SV2);
        Gr3 = random(SV3);
        Gr4 = random(SV4);
        testfp.graphSV()
    X1label="SLOW"
    X2label="QUICK"
    Y1label="LOUD"
    Y2label="QUIET"
    graphLabel = "SPEED/VOLUME"
    }
      else if(graph===1){
        Gr1 = random(VP1);
        Gr2 = random(VP2);
        Gr3 = random(VP3);
        Gr4 = random(VP4);
          testfp.graphVP()
    X1label="QUIET"
    X2label="LOUD"
    Y1label="HIGH"
    Y2label="LOW"
    graphLabel = "VOLUME/PITCH"
      }
  }
  imageMode(CORNER)
  tint(255, 60);
  frameRate(2)
  image(Gr1, 350, 100, width/2-250, height/2-100); //300 e -300
  image(Gr2, 100+width/2, 100, width/2-250, height/2-100);
  image(Gr3, 350, height/2, width/2-250, height/2-100); //350
  image(Gr4, 100+width/2, height/2, width/2-250, height/2-100);
}
function pitchSpeed(){
  graph=3
}
function speedVolume(){
  graph=2
}
function volumePitch(){
  graph=1
}
}
}
function mouseClicked(){
  if(action_state==3 && mouseY<100 && mouseX<200){
    save(cnv2, 'myVoicePicture.jpg');
    //metti cnv2
  }
}
function get_min_max_of_2d_array(array){
  let size_1 = array.length
  let size_2 = array[0].length
  let min = 9999
  let max = -9999
  for (var ii = 0; ii < size_1; ii++) {
    let sub_array = array[ii]
    for (var jj = 0; jj < size_2; jj++) {
      let current_element = sub_array[jj]
      if (current_element<min) {
        min = current_element}
      if (current_element>max) {
        max = current_element}
    }
  }
  return [min,max]
}
//Returns the average fft value per frequency
function average_frequencies(array){
  let averages = []
  let size_1 = array.length
  let size_2 = array[0].length
  let temp=0
  //Loop over the frequency bins
  for (var ii = 0; ii < size_2; ii++) {
    temp=0
    //Loop over all the FFT's
    for (var jj = 0; jj < size_1; jj++) {
      let sub_array = array[jj]
      let val = map(sub_array[ii],min(sub_array),max(sub_array),0,1)
      temp=+val
      //temp=+sub_array[ii]
    }
    append(averages,temp/size_1)
  }
 // console.log("averages1"+ averages)
  return averages
  
}
class Voice_Fingerprint{
  constructor(file, duration){
    this.file = file
    this.duration = duration
    this.spectrogram = []
    this.fft = new p5.FFT(0.9,256)
    this.fft.setInput(this.file)
    this.amplitudes = []
    this.amp = new p5.Amplitude()
    this.amp.setInput(this.file)
    this.pb_start_fc=0
    this.has_stopped = false
    this.has_started_analyzing = false
    this.has_finished_analyzing = false
    this.is_displayed = false
    this.minimum = 9999
    this.maximum = -9999
    this.min_avg = 0
    this.max_avg = 0
    this.max_vol=0
    this.min_vol=0
    this.averages = 0
    this.WAverage
    this.energy = []
   
  }
    
    
  analyzer(){
   // console.log("analizying")
    if(this.has_started_analyzing===false){
      this.has_started_analyzing=true
      this.pb_start_fc = frameCount
    //console.log(analyzing)
      this.file.play()
      
    }
    if(analyzing < this.duration){
      new_spectrum = this.fft.analyze()
     // console.log(new_spectrum)
      append(this.spectrogram,new_spectrum)
      let new_amplitude = this.amp.getLevel()
      append(this.amplitudes,new_amplitude)
      let new_energies = this.fft.getEnergy(100,[300])
    //   console.log(new_energies)
       append(this.energy,new_energies)
    }
    else{
      this.has_finished_analyzing = true
      this.max_vol=max(this.amplitudes)
      this.min_vol=min(this.amplitudes)
      this.averages = average_frequencies(this.spectrogram)
  
      this.max_avg = max(this.averages)
     // console.log("this+",this.max_avg)
      
      let sum = 0
        for (let i = 0; i < this.amplitudes.length; i++) {
          sum += this.amplitudes[i];
        }
        let averageAmp = sum / this.amplitudes.length
      
        
      this.WAverage = 0
      for (let i = 0; i < this.averages.length; i++){
      this.WAverage += i*this.averages[i]
      }
      console.log("WAverage" + this.WAverage)
      let maxVal=200
      let maxDurat=500
      let volume = map(averageAmp,0,0.05,0,maxVal)
      volumeStat = round(volume, 0);
      let speed = map(this.duration,0,maxDurat,200,0)
      speedStat = round(speed, 0);
      let pitch = map(this.WAverage, 0, 80,maxVal,0)
      pitchStat = round(pitch, 0);
      if(speedStat<(maxVal/2) && volumeStat<(maxVal/2) && pitchStat<(maxVal/2)){
        profileN = 1
        textN = 1
        }
        
        else if(speedStat>(maxVal/2) && volumeStat<(maxVal/2) && pitchStat<(maxVal/2)){
          profileN = 2
          textN = 2
          }
        
          else if(speedStat>(maxVal/2) && volumeStat>(maxVal/2) && pitchStat<(maxVal/2)){
            profileN = 3
            textN = 3
            }
            
            else if(speedStat>(maxVal/2) && volumeStat>(maxVal/2) && pitchStat>(maxVal/2)){
              profileN = 4
              textN = 4
              }
            
              else if(speedStat<(maxVal/2) && volumeStat<(maxVal/2) && pitchStat>(maxVal/2)){
                profileN = 5
                textN = 5
                }
        
                else if(speedStat<(maxVal/2) && volumeStat>(maxVal/2) && pitchStat>(maxVal/2)){
                  profileN = 6
                  textN = 6
                  }
                  
                  else if(speedStat<(maxVal/2) && volumeStat>(maxVal/2) && pitchStat<(maxVal/2)){
                    profileN = 7
                    textN = 7
                    }
                  
                    else if(speedStat>(maxVal/2) && volumeStat<(maxVal/2) && pitchStat>(maxVal/2)){
                      profileN = 8
                      textN = 8
                      }
      if(databaseLoaded===false){
      databaseLoaded=true
      const props = {
        x: speedStat,
        vol: volumeStat,
        pitch: pitchStat,
      }
      addDot(props)
    }
    }
    
     // this.post_process()
    
    //soundFile.play(); // play the result!
    //save(soundFile, 'mySound.wav');
    //testfp.playback()
    //state++;
  }
  
profiles(){
  //cnv3 = createCanvas(windowWidth, windowHeight);
    //cnv3.position(0,0)
  tint(255, 255);
    imageMode(CENTER)
 
    image(profiles[profileN-1], 350, 250, 545, 371);
    image(texts[textN-1], 1100, 300, 545, 381);
    stroke(0)
    strokeWeight(3)
    fill(255)
    rect(350, 350, 500, 325)
  
  //image(profiles[profileN-1], width/2, height/2-300);
  //console.log("profile"+ profileN)
  noStroke()
  //text("PROFILE TYPE"+ profileN +"/8", width/2, height/2-100)
  //if (!div) {
  //  drawEllipse(); 
  //}
fill(0)
text("YOUR SPEED: "+ speedStat, width/2-205, height/2)
text("YOUR VOLUME: "+ volumeStat, width/2-203, height/2+100)
text("YOUR PITCH: "+ pitchStat, width/2-200, height/2+200)
stroke(0)
strokeWeight(3)
line(width/2-325, height/2+30, width/2+75, height/2+30)
line(width/2-325, height/2+130, width/2+75, height/2+130)
line(width/2-325, height/2+230, width/2+75, height/2+230)
line(width/2-125, height/2+25, width/2-125, height/2+35)
line(width/2-125, height/2+125, width/2-125, height/2+135)
line(width/2-125, height/2+225, width/2-125, height/2+235)
noStroke()
let mySpeed = map(speedStat, 0, maxVal, width/2-325, width/2+75)
let myVolume = map(volumeStat, 0, maxVal, width/2-325, width/2+75)
let myPitch = map(pitchStat, 0, maxVal, width/2-325, width/2+75)
fill("red")
image(starblue, mySpeed, height/2+30, 20, 20)
image(starblue, myVolume, height/2+130, 20, 20)
image(starblue, myPitch, height/2+230, 20, 20)
// STELLE DI SFONDO
/*
image(starblue, 250, 400, 50, 50)
image(starblue, 400, 100, 50, 50)
image(starblue, 700, 200, 50, 50)
image(starblue, 150, 550, 50, 50)
image(starblue, 500, 550, 50, 50)
*/


//IMAGINI SFONDO

image(iconabg1, 700, 200, 75, 75)
image(iconabg2, 150, 650, 75, 75)
image(iconabg4, 950, 550, 75, 75)


 
}
graphVP(){
 
  const dot = allDots[key];
  
  let volumeGraph = map(dot.vol, 0, maxVal, 350, width-250); //300 e -250
  let pitchGraph = map(dot.pitch, 0, maxVal, height-100, 100);
  fill("#1d3fd6")
  ellipse(volumeGraph, pitchGraph, 10,10); 
  //image(starblue, volumeGraph, pitchGraph, 10, 10);    
  let myVolumeGraph = map(volumeStat, 0, maxVal, 350, width-250);
  let myPitchGraph = map(pitchStat, 0, maxVal, height-100, 100);
  //fill("white")
  //rect(myVolumeGraph, myPitchGraph, 30,30); 
  imageMode(CENTER) 
  image(littlesmile, myVolumeGraph, myPitchGraph, 30, 30) 
}
graphSV(){
 const dot = allDots[key];

 fill("#1d3fd6")
 //let durationGraph = map(dot.x, 0, maxDurat, 350, width-250);
 let durationGraph = map(dot.x, 0, maxVal, 350, width-250);
 let volumeGraph = map(dot.vol, 0, maxVal, height-100, 100);
 //image(starblue, durationGraph, volumeGraph, 10, 10); 
 ellipse(durationGraph, volumeGraph, 10,10); 
 //console.log('star')

 //let myDurationGraph = map(speedStat, 0, maxDurat, 350, width-250);
 let myDurationGraph = map(speedStat, 0, maxVal, 350, width-250);
 let myVolumeGraph = map(volumeStat, 0, maxVal, height-100, 100);

   //fill("white")
  //rectMode(CENTER)
  //rect(myDurationGraph, myVolumeGraph, 30,30); 
  imageMode(CENTER) 
  image(littlesmile, myDurationGraph, myVolumeGraph, 30, 30) 
}
graphPS(){
const dot = allDots[key];

 fill("#1d3fd6")
 let pitchGraph = map(dot.pitch, 0, maxVal, 350, width-150);
 //let durationGraph = map(dot.x, 0, maxDurat, height-100, 100);
 let durationGraph = map(dot.x, 0, maxVal, height-100, 100);
 ellipse(pitchGraph, durationGraph, 10,10);
 //image(starblue, pitchGraph, durationGraph, 10, 10); 


 let myPitchGraph = map(pitchStat, 0, maxVal, 350, width-300);
 //let myDurationGraph = map(speedStat, 0, maxDurat, height-100,100);
 let myDurationGraph = map(speedStat, 0, maxVal, height-100,100);

 //fill("white")
 //rectMode(CENTER)
//rect(myPitchGraph, myDurationGraph, 30,30);
imageMode(CENTER) 
image(littlesmile, myPitchGraph, myDurationGraph, 30, 30) 
}
display(){
 
  background(255)
   
  /*
  let size_x = this.spectrogram.length
  let size_y = this.spectrogram[0].length
  let x_unit = width/size_x
  let y_unit = height/size_y
  let min_max = get_min_max_of_2d_array(this.spectrogram)
  this.minimum = min_max[0]
  this.maximum = min_max[1]
  let max_vol=max(this.amplitudes)
  let min_vol=min(this.amplitudes)
  
  for (var ii = 0; ii < this.spectrogram.length; ii++) {
    let vol = this.amplitudes[ii]
    console.log(vol)
    let col = map(vol,min_vol,max_vol,0,255)
    console.log(col)
    let sub_array = this.spectrogram[ii]
    let norm = sub_array
    for (var jj = 0; jj < norm.length; jj++) {
      let current_element=norm[jj]
      let diameter = map(current_element,this.minimum,this.maximum,1,15)
      noStroke()
      fill(col/2)
      ellipse(ii*x_unit,jj*y_unit,diameter)
    }
  }
  let averages = average_frequencies(this.spectrogram)
  this.max_avg = max(averages)
  this.min_avg = min(averages)
  fill(this.maximum,this.min_avg,this.max_avg,250)
  for (var kk = 0; kk < averages.length; kk++) {
    let current_value = averages[kk]
    let height = map(current_value,this.min_avg,this.max_avg,0,width/2)
    rect(0,kk*y_unit,height,y_unit)
    rect(width,kk*y_unit,-height,y_unit)
  }
  
  */
 
 
  let f = pitchStat*1.5
  //tint(0, 255, f);
 // image(profiles[profileN-1], width/2, height/2);
  console.log(f+'pitch')
  
 
  let a = volumeStat/100
  console.log(volumeStat)
  console.log(speedStat+'speed')
  let b = speedStat/5
  // img stessa grandezza e oki !
  let i
  let c
  
  let x
  let y
  
  
  //console.log(speedStat)
  push()
translate(width/2, height/2)
  for (i=0; i<10; i++) {
    frameRate(b/3)
    x = round(random(0, b))
    y = round(random(0, b))
 // console.log('for ok')
  //fill(255)
  //stroke(0)
  //ellipse(x, y, 10, 10)
  
  // console.log(f+'f')
  
  imageMode(CENTER)
  image(profiles[profileN-1], x, y, 436*a, 297*f/100*a);
  
} 
for (let ii=0;ii<this.averages.length;ii+=40){
  console.log(this.duration_fc)
  //let xoff=map(cos(ii),-1,1,0,5)
  //let yoff=map(sin(ii),-1,1,0,5)
  //let n = noise(xoff+this.start,yoff+this.start)
  let height = this.averages[ii%(this.averages.length)]
  angleMode(DEGREES)
  push()
  rotate(ii*360/this.averages.length)
  //fill(this.duration,this.minimum,this.maximum)
  let r = map(this.duration,50,220,50,200)
  let g = map(this.amplitudes[ii%(this.amplitudes.length)],0,this.max_vol,50,200)
  let b = map(height,this.min_avg,this.max_avg,50,200)
  let alpha = map(this.max_vol,0,0.6,60,200)
  noStroke()
  fill(r,g,b,alpha)
  let w = map(this.duration,40,220,40,50)
  //if(this.decider<0.7){
  let distance = map(this.duration,150,220,50,150)
  imageMode(CORNER)
  tint(r, g, b);
  image(profiles[profileN-1],distance,0,map(height,this.min_avg,this.max_avg,20,50), w)
  noFill()
  strokeWeight(4)
  ellipseMode(CENTER)
  stroke(r,g,b,alpha)
  let s = map(this.max_vol, 0, 0.5, 50, 600)
  image(littlesmile, 0, s, g/3, g/3);
  pop()
  
  //rect(this.duration,4,100,3)
  }
  for (c=0; c<b/2; c++) {
    let xstar = random(100, f*2)
    let ystar = random(100, f*2)
    
    image(starblue, xstar, ystar, 50, 50)
  }
  
  
  //profiles.display()
 
 console.log('ok')
}
  
//}
special_display(){
  background(0)
  for (let ii=0;ii<this.averages.length;ii+=1){
    console.log(this.duration_fc)
    //let xoff=map(cos(ii),-1,1,0,5)
    //let yoff=map(sin(ii),-1,1,0,5)
    //let n = noise(xoff+this.start,yoff+this.start)
    let height = this.averages[ii%(this.averages.length)]
    angleMode(DEGREES)
    push()
    rotate(ii*360/this.averages.length)
    //fill(this.duration,this.minimum,this.maximum)
    let r = map(this.duration,50,220,50,200)
    let g = map(this.amplitudes[ii%(this.amplitudes.length)],0,this.max_vol,50,200)
    let b = map(height,this.min_avg,this.max_avg,50,200)
    let alpha = map(this.max_vol,0,0.6,60,200)
    noStroke()
    
    fill(r,g,b,alpha)
    let w = map(this.duration,40,220,0,30)
    //if(this.decider<0.7){
    let distance = map(this.duration,150,220,50,150)
    ellipseMode(CORNER)
    ellipse(distance,0,map(height,this.min_avg,this.max_avg,20,800), w)
    noFill()
    strokeWeight(4)
    ellipseMode(CENTER)
    stroke(r,g,b,alpha)
    let s = map(this.max_vol, 0, 0.5, 50, 600)
    ellipse(0,s, g/3)
    pop()
    
    //rect(this.duration,4,100,3)
    }
    //if (this.decider>=0.7){
    //circle(map(n,0,1,this.min_x,this.max_x),random(),height/2)}
    imageMode(CENTER)
    //image(profiles[profileN-1], windowWidth/2, windowHeight/2);
    image(littlesmile, 100, 100);
    console.log('image loaded)')
  }
}
function previous(){
  if(action_state==1){
    action_state=-1
    has_started=false
    has_stopped =false
    durationRec=0
  }
  if(action_state==4){
    action_state=3
  }
  else if(action_state>3){
    action_state--}
}
/*
function showText() { 
   if (!paragprova) { 
     console.log(profileN + 'profile_N')
     let testovario = [
       text_1 = 'risultato_1',
       text_2 = 'risultato_2',
       text_3 = 'risultato_3',
     ]
    if (profileN = 1) {
   paragprova = createP(text_1)
   paragprova.style('color', 'red')
   paragprova.position(30, 30)
  } else {
    paragprova = createP(text_2)
    paragprova.style('color', 'blue')
    paragprova.position(30, 30)
   } 
    
     paragprova.show()
} 
} 
*/
function drawEllipse() {
 
  div = createDiv('')
  div.addClass('myClass'); 
  div.position(0, 0)
  let p = createP('testo da inserire').parent(div)
  p.addClass('myP')
  let div2 = createDiv('').parent(div)
  div2.addClass('myDiv2');
  let circle = createButton('nome', 50, 50)
  circle.parent(div2)
  
  
   
  tint(255, 255);
  //Mode(CENTER)
  let img2
  img2 = image(profiles[profileN-1], width/2, height/2-300);
  
  
  //console.log("profile"+ profileN)
  // testo 
  noStroke()
  let ptype = createP("PROFILE TYPE"+ profileN +"/8").parent(div2)
  console.log(profileN)
  ptype.style('color', 'red')
  ptype.position(200, 200)
  /*
  text("SPEED"+ speedStat, width/2, height/2)
  text("VOLUME"+ volumeStat, width/2, height/2+100)
  text("PITCH"+ pitchStat, width/2, height/2+200)
  
  stroke("255")
  strokeWeight(5)
  line(width/2-200, height/2+30, width/2+200, height/2+30)
  line(width/2-200, height/2+130, width/2+200, height/2+130)
  line(width/2-200, height/2+230, width/2+200, height/2+230)
  
  line(width/2, height/2+25, width/2, height/2+35)
  line(width/2, height/2+125, width/2, height/2+135)
  line(width/2, height/2+225, width/2, height/2+235)
  
  noStroke()
  */ 
  let mySpeed = map(speedStat, 0, maxVal, width/2-200, width/2+200)
  let myVolume = map(volumeStat, 0, maxVal, width/2-200, width/2+200)
  let myPitch = map(pitchStat, 0, maxVal, width/2-200, width/2+200)
  
  console.log(mySpeed)
  console.log(myVolume)
  console.log(myPitch)
  fill("red")
  let ast = createImg('./assets/meme-home-1.png').parent(div2)
  console.log('ok2')
  ast.position(mySpeed/10, height/2+30, 20, 20)
  ast.addClass('asters')
  //ast.position(myVolume, height/2+130, 20, 20)
  //ast.position(myPitch, height/2+230, 20, 20)
  
  // IMMAGIN
  if (profileN ==1) {
    
    //image(meme1graph, 100, 100, 250, 250) 
    console.log('profilo 1')
    ellipse(100, 100)
  } else {
    ellipse(50, 50)
    //image(meme1scritta, 200, 200, 250, 250)
    console.log('profile altri')
  }
}