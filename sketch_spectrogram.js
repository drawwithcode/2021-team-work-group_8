let mic, recorder, soundFile;
let state;
let start_fc,stop_fc,duration_fc
let button
let action_state=-1
let new_spectrum
let has_started=false
let has_stopped =false

function setup() {
  createCanvas(windowWidth, windowHeight);
  button=createButton()
  //cnv.mousePressed(canvasPressed);
  background(220);
  textAlign(CENTER, CENTER);

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();

  text('tap to record', width/2, height/2);


}

function draw(){
  button.mouseClicked(canvasPressed)
  userStartAudio();
  console.log(action_state)

  // make sure user enabled the mic
  if (action_state === 0 && mic.enabled && has_started===false) {
    has_started=true
    // record to our p5.SoundFile
    recorder.record(soundFile);
    start_fc = frameCount

    background(255,0,0);
    text('Recording!', width/2, height/2);
    //state++;
  }
  else if (action_state === 1 && has_stopped===false) {
    has_stopped=true
    background(0,255,0);

    // stop recorder and
    // send result to soundFile
    recorder.stop();
    stop_fc = frameCount
    duration_fc = stop_fc-start_fc
    testfp = new Voice_Fingerprint(soundFile,duration_fc)

    text('Done! Tap to play and download', width/2, height/2, width - 20);
    //state++;
  }

  else if (action_state === 2 ) {
    testfp.analyzer()
    //soundFile.play(); // play the result!
    //save(soundFile, 'mySound.wav');

    //testfp.playback()
    //state++;
    if(testfp.has_finished_analyzing===true){
      action_state++
    }
  }
  else if (action_state===3){
    testfp.display()
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


function canvasPressed(){
  action_state++
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
    if(this.has_started_analyzing===false){
      this.has_started_analyzing=true
      this.pb_start_fc = frameCount
      this.file.play()
    }
    if((frameCount-this.pb_start_fc) < this.duration){
      new_spectrum = this.fft.analyze()
      append(this.spectrogram,new_spectrum)
      let new_amplitude = this.amp.getLevel()
      append(this.amplitudes,new_amplitude)
    }
    else{
      this.has_finished_analyzing = true
      let min_max = get_min_max_of_2d_array(this.spectrogram)
      this.minimum = min_max[0]
      this.maximum = min_max[1]
      this.max_vol=max(this.amplitudes)
      this.min_vol=min(this.amplitudes)

      this.post_process()
    }
    //soundFile.play(); // play the result!
    //save(soundFile, 'mySound.wav');

    //testfp.playback()
    //state++;
  }

  post_process(){
    let size_1 = this.spectrogram.length
    let size_2 = this.spectrogram[0].length
    let new_array = []
    for (var ii = 0; ii < size_1; ii++) {
      let sub_array = this.spectrogram[ii]
      let new_sub_array = []
      for (var jj = round(size_2/150); jj < round(size_2); jj++) {
      //for (var jj = 0; jj < round(size_2); jj++) {
        let value = sub_array[jj]
        append(new_sub_array,value*value)
      }
      append(new_array,new_sub_array)
      //this.spectrogram[ii].slice(round(size_2/30),-round(size_2/3))


    }
    this.spectrogram = new_array
    this.averages = average_frequencies(this.spectrogram)
    this.max_avg = max(this.averages)
    this.min_avg = min(this.averages)
  }


  playback(){
    this.file.play()
    const pb_start_fc = frameCount
    while((frameCount-pb_start_fc) < this.duration){
        let new_spectrum = this.fft.analyze()
        //if(new_spectrum != spectrum){
          append(this.spectrogram,new_spectrum)
          //spectrum = new_spectrum
        //}
      }
    //console.log(this.spectrogram)

  }

  display(){
    if(this.is_displayed===false){
    this.is_displayed = true
    background(255)
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
}



}
