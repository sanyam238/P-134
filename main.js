status="";
object = [];
song="";

function preload(){
    song= loadSound("myalarm.mp3");
}

function start(){
    objDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function draw(){
    image(video,0,0,380,380);
    r = random(255);
    g = random(255);
    b = random(255);
    
    if(status !=""){
        objDetector.detect(video,gotResult); 

        for (i=0; i < object.length; i++) {
            
            document.getElementById("status").innerHTML = "Baby detected";
            document.getElementById("obj_detector_label").innerHTML = "Number of objects: "+ object.length;
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label+ " " + percent + "%", object[i].x+15, object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    else{
        song.play();
    }
}

function modelLoaded(){
  console.log("model is loaded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  status = true;
  
}

function gotResult(error,result){
if(error){
    console.error(error);
}
  if(result) {
  console.log(result);
  object = result;
 }
}