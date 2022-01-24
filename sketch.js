

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  button2=createButton()
  button1=createButton()
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
  button1.mouseClicked(next)
  button2.mouseClicked(previous)
 // button2.mouseClicked(canvasPressed)
  userStartAudio();
  //console.log(action_state)

  // make sure user enabled the mic
  
if(action_state==-1){
  background(200)
  text('Record!', width/2, height/2);
}

  if(action_state === 0 && mic.enabled && has_started===false){
    has_started=true
    recorder.record(soundFile);
    start_fc = frameCount
    background(255,0,0);
    text('Recording!', width/2, height/2);
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
    has_stopped=true
    background(0,255,0);
    recorder.stop();
    stop_fc = frameCount
    duration_fc = stop_fc-start_fc
    testfp = new Voice_Fingerprint(soundFile,duration_fc)
   // console.log(duration_fc)
    text('ok / record again', width/2, height/2);
    //state++;
  }


  else if (action_state === 2 && analyze===false) {
    analyze==true
    console.log(analyze)
    
    console.log(testfp)
    background("pink")
    testfp.analyzer()
    analyzing++
  //  soundFile.play(); //non funziona
    text('analyzing...', width/2, height/2);
    console.log(testfp.has_finished_analyzing)
    if(testfp.has_finished_analyzing===true){
      action_state++
    }

  }

 

  else if (action_state===3){
   // translate(windowWidth/2,windowHeight/2)
    testfp.display()
  }

  
  if (action_state===4){
    background("red")
    fill(255)
    textSize(20)
    text("stats"+ duration_fc, windowWidth/2, windowHeight/2)
  }


  function next(){
  if(action_state!=2){
    action_state++
  }
    if(action_state===5 && dotDrawn==false){
      dotDrawn==true
      background("blue")
      stroke(0)
      line(100, windowHeight/2, windowWidth-100, windowHeight/2)
      fill(255)
      text("graphs", windowWidth/2, windowHeight/2-300)
      if(allDots){
        //  console.log(allGreetings)
        for(key in allDots){
          const dot = allDots[key];
          noFill()
let durationStat = map(dot.x, 0, 200, 100, windowWidth-100);
          fill("red")
          ellipse(durationStat, windowHeight/2, 50,50);
          fill(255)
          text(dot.x, durationStat, windowHeight/2);
          console.log(dot.x)
        }
        }
    }
    
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
      console.log(new_spectrum)
      append(this.spectrogram,new_spectrum)
      let new_amplitude = this.amp.getLevel()
      append(this.amplitudes,new_amplitude)
    }


    else{
      this.has_finished_analyzing = true
      this.max_vol=max(this.amplitudes)
      this.min_vol=min(this.amplitudes)

      if(analyzing==this.duration){
      const props = {
        x: this.duration,
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

  

  display(){

    background(0)
    let size_x = this.spectrogram.length
    let size_y = this.spectrogram[0].length
    let x_unit = windowWidth/size_x
    let y_unit = windowHeight/size_y
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
      let height = map(current_value,this.min_avg,this.max_avg,0,windowWidth/2)
      rect(0,kk*y_unit,height,y_unit)
      rect(windowWidth,kk*y_unit,-height,y_unit)
    }
  
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