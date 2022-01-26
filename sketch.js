

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
let maxDuration=200

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

let volumeStat
let speedStat
let pitchStat

let maxVal = 200

let meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8
profiles = []


function preload() {
  meme1 = loadImage('assets/meme1.png');
  meme2 = loadImage('assets/meme2.png');
  meme3 = loadImage('assets/meme3.png');
  meme4 = loadImage('assets/meme4.png');
  meme5 = loadImage('assets/meme5.png');
  meme6 = loadImage('assets/meme6.png');
  meme7 = loadImage('assets/meme7.png');
  meme8 = loadImage('assets/meme8.png');
}



function setup() {

  profiles = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8]

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
  button2=createButton("RECORD")
    button2.position(windowWidth/2, windowHeight/2);
    button2.addClass('button');
    button2.mouseClicked(next)
  }
  else if(button2){
    button2.show()
  }

  background(255)
  show1=false
}

  if(action_state === 0 && mic.enabled && has_started===false){
    button2.hide()

    if(!buttonStop){
      buttonStop=createButton("STOP")
      buttonStop.position(windowWidth/2, windowHeight/2);
      buttonStop.addClass('button');
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
    text('Recording!', width/2, height/2-200);
    show1=false
    label2 = 2
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
      buttonPrevious1=createButton("<-RECORD AGAIN")
      buttonPrevious1.position(500, windowHeight/2);
      buttonPrevious1.addClass('button');
      buttonPrevious1.mouseClicked(previous)
      }
      else if(buttonPrevious1){
        buttonPrevious1.show()
      }

      if(!buttonNext1){
        buttonNext1=createButton("OK->")
        buttonNext1.position(windowWidth-500, windowHeight/2);
        buttonNext1.addClass('button');
        buttonNext1.mouseClicked(next)
        }
        else if(buttonNext1){
          buttonNext1.show()
        }
  

    show1=true
    has_stopped=true
    background(255);
    recorder.stop();
    stop_fc = frameCount
    duration_fc = stop_fc-start_fc
    testfp = new Voice_Fingerprint(soundFile,duration_fc)
   // console.log(duration_fc)
    //state++;
  }



  else if (action_state === 2 && analyze===false) {
    buttonNext1.hide()
    buttonPrevious1.hide()
    
    analyze==true
    console.log(analyze)
    
    console.log(testfp)
    background('#1d3fd6')
    testfp.analyzer()
    analyzing++
  //  soundFile.play(); //non funziona
    textSize(30)
    fill(255)
    text('analyzing...', width/2, height/2);
    console.log(testfp.has_finished_analyzing)
    if(testfp.has_finished_analyzing===true){
      action_state++
    }

  }

 

  else if (action_state===3){
      if(!buttonNext){
        buttonNext=createButton("->")
        buttonNext.position(windowWidth-200, windowHeight-100);
        buttonNext.addClass('button');
        buttonNext.mouseClicked(next)
        }
        else if(buttonNext){
          buttonNext.show()
        }
      if(buttonPrevious){
        buttonPrevious.hide()
      }
   // translate(windowWidth/2,windowHeight/2)


   cnv2 = createCanvas(700, 700);
   cnv2.position(windowWidth/2-350,windowHeight/2-350)
    testfp.display()
    
    if(!p){
    p = createP('CLICK HERE TO DOWNLOAD');
    p.style('font-size', '30px');
    p.position(windowWidth/2, 0);
    }
    else if(p){
      p.show()
    }
  }

  
  if (action_state===4){
    p.hide()
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0,0)
    if(!buttonPrevious){
      buttonPrevious=createButton("<-")
      buttonPrevious.position(200, windowHeight-100);
      buttonPrevious.addClass('button');
      buttonPrevious.mouseClicked(previous)
      }
      else if(buttonPrevious){
        buttonPrevious.show()
      }
    buttonNext.show()
    background(29, 64, 214)
    fill(255)
    textSize(20)
    testfp.profiles()
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
    buttonNext.hide()
  if(show==false){
    show=true
    button3 = createButton('pitch/speed');
    button3.position(100, windowHeight-500);
    button3.mousePressed(pitchSpeed);

    button4 = createButton('volume/pitch');
    button4.position(100, windowHeight-400);
    button4.mousePressed(volumePitch);

    button5 = createButton('speed/volume');
    button5.position(100, windowHeight-300);
    button5.mousePressed(speedVolume);}
    
    console.log(graph)
    dotDrawn==true
    background("#1d3fd6")

    stroke("255")
    strokeWeight(8)
    line(100, windowHeight/2, windowWidth-100, windowHeight/2)
    line(windowWidth/2, 100, windowWidth/2, windowHeight-100)
    noStroke()
    fill(255)
    push()
    rotate(PI/2)
    text(Y1label, 100, -windowWidth/2-30)
    text(Y2label, windowHeight-100, -windowWidth/2-30)
    pop()
    text(X1label, 100, windowHeight/2-30)
    text(X2label, windowWidth-100, windowHeight/2-30)

    text(graphLabel, 200, 50)

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
  tint(255, 40);
  frameRate(2)
  image(Gr1, 0, 0, windowWidth/2, windowHeight/2);
  image(Gr2, windowWidth/2, 0, windowWidth/2, windowHeight/2);
  image(Gr3, 0, windowHeight/2, windowWidth/2, windowHeight/2);
  image(Gr4, windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2);

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
  if(action_state==3 && mouseY<100){
    save(cnv2, 'myVoicePicture.jpg');
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

    this.energy = []
   
  }
    
    


  analyzer(){
    console.log("analizying")
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
       console.log(new_energies)
       append(this.energy,new_energies)
    }



    else{
      this.has_finished_analyzing = true
      this.max_vol=max(this.amplitudes)
      this.min_vol=min(this.amplitudes)

      let averages = average_frequencies(this.spectrogram)
  
      this.max_avg = max(averages)
     // console.log("this+",this.max_avg)
      
      let sum = 0
      for (let j = 0; j < this.spectrogram.length; j++){
        for (let i = 0; i < this.amplitudes.length; i++) {
          sum += this.amplitudes[i];
        }}
        let averageAmp = sum / this.spectrogram.length / this.amplitudes.length

        let sum1 = 0
      for (let j = 0; j < this.spectrogram.length; j++){
        for (let i = 0; i < this.energy.length; i++) {
          sum1 += this.energy[i];
        }}
        console.log("sum"+ sum1)
        let averagePitch = sum1 / this.spectrogram.length / this.energy.length
        


      let maxVal=200
      let volume = map(averageAmp,0,0.3,0,maxVal)
      volumeStat = round(volume, 0);

      let speed = map(this.duration,0,200,maxVal,0)
      speedStat = round(speed, 0);

      let pitch = map(averagePitch, 60, 255,maxVal,0)
      pitchStat = round(pitch, 0);

      if(speedStat<(maxVal/2) && volumeStat<(maxVal/2) && pitchStat<(maxVal/2)){
        profileN = 1
        }
        
        else if(speedStat>(maxVal/2) && volumeStat<(maxVal/2) && pitchStat<(maxVal/2)){
          profileN = 2
          }
        
          else if(speedStat>(maxVal/2) && volumeStat>(maxVal/2) && pitchStat<(maxVal/2)){
            profileN = 3
            }
            
            else if(speedStat>(maxVal/2) && volumeStat>(maxVal/2) && pitchStat>(maxVal/2)){
              profileN = 4
              }
            
              else if(speedStat<(maxVal/2) && volumeStat<(maxVal/2) && pitchStat>(maxVal/2)){
                profileN = 5
                }
        
                else if(speedStat<(maxVal/2) && volumeStat>(maxVal/2) && pitchStat>(maxVal/2)){
                  profileN = 6
                  }
                  
                  else if(speedStat<(maxVal/2) && volumeStat>(maxVal/2) && pitchStat<(maxVal/2)){
                    profileN = 7
                    }
                  
                    else if(speedStat>(maxVal/2) && volumeStat<(maxVal/2) && pitchStat>(maxVal/2)){
                      profileN = 8
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
  tint(255, 255);
imageMode(CENTER)
image(profiles[profileN-1], windowWidth/2, windowHeight/2-300);
//console.log("profile"+ profileN)
noStroke()
text("profile type"+ profileN +"/8", windowWidth/2, windowHeight/2-100)

text("speed"+ speedStat, windowWidth/2, windowHeight/2)
text("volume"+ volumeStat, windowWidth/2, windowHeight/2+100)
text("pitch"+ pitchStat, windowWidth/2, windowHeight/2+200)

stroke("255")
strokeWeight(5)
line(windowWidth/2-200, windowHeight/2+30, windowWidth/2+200, windowHeight/2+30)
line(windowWidth/2-200, windowHeight/2+130, windowWidth/2+200, windowHeight/2+130)
line(windowWidth/2-200, windowHeight/2+230, windowWidth/2+200, windowHeight/2+230)

line(windowWidth/2, windowHeight/2+25, windowWidth/2, windowHeight/2+35)
line(windowWidth/2, windowHeight/2+125, windowWidth/2, windowHeight/2+135)
line(windowWidth/2, windowHeight/2+225, windowWidth/2, windowHeight/2+235)

noStroke()

let mySpeed = map(speedStat, 0, maxVal, windowWidth/2-200, windowWidth/2+200)
let myVolume = map(volumeStat, 0, maxVal, windowWidth/2-200, windowWidth/2+200)
let myPitch = map(pitchStat, 0, maxVal, windowWidth/2-200, windowWidth/2+200)

fill("red")
ellipse(mySpeed, windowHeight/2+30, 20, 20)
ellipse(myVolume, windowHeight/2+130, 20, 20)
ellipse(myPitch, windowHeight/2+230, 20, 20)
}


graphVP(){
 
      const dot = allDots[key];
      
      let volumeGraph = map(dot.vol, 0, maxVal, 100, windowWidth-100);
      let pitchGraph = map(dot.pitch, 0, maxVal, windowHeight-100, 100);

      fill("red")
      ellipse(volumeGraph, pitchGraph, 10,10);    

      let myVolumeGraph = map(volumeStat, 0, maxVal, 100, windowWidth-100);
      let myPitchGraph = map(pitchStat, 0, maxVal, windowHeight-100, 100);

      fill("white")
      rectMode(CENTER)
      rect(myVolumeGraph, myPitchGraph, 30,30);   
    
}

graphSV(){
 
  const dot = allDots[key];

  fill("red")
  let durationGraph = map(dot.x, 0, maxVal, 100, windowWidth-100);
  let volumeGraph = map(dot.vol, 0, maxVal, windowHeight-100, 100);
  ellipse(durationGraph, volumeGraph, 10, 10); 
  
  let myDurationGraph = map(speedStat, 0, maxVal, 100, windowWidth-100);
  let myVolumeGraph = map(volumeStat, 0, maxVal, windowHeight-100, 100);

      fill("white")
      rectMode(CENTER)
      rect(myDurationGraph, myVolumeGraph, 30,30); 

}

graphPS(){
 
  const dot = allDots[key];

  fill("red")
  let pitchGraph = map(dot.pitch, 0, maxVal, 100, windowWidth-100);
  let durationGraph = map(dot.x, 0, maxVal, windowHeight-100, 100);
  ellipse(pitchGraph, durationGraph, 10,10);


  let myPitchGraph = map(pitchStat, 0, maxVal, 100, windowWidth-100);
  let myDurationGraph = map(speedStat, 0, maxVal, windowHeight-100,100);

  fill("white")
    rectMode(CENTER)
  rect(myPitchGraph, myDurationGraph, 30,30);

}


display(){

  background(0)
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
    //console.log(vol)
    let col = map(vol,min_vol,max_vol,0,255)
    //console.log(col)
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
  imageMode(CENTER)
  image(profiles[profileN-1], width/2, height/2);
}


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
    image(profiles[profileN-1], windowWidth/2, windowHeight/2);

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