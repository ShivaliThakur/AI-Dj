var leftWristX=0;
var leftWristY=0;
var rightWristX=0;
var rightWristY= 0;
var rightWristScore= 0;
var leftWristScore= 0;


function setup(){
    canvas= createCanvas(600,500);
    canvas.position(350, 250);
    video= createCapture(VIDEO);
    video.hide();
    posenet= ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotResults);
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if (rightWristScore > 0.001){
        circle(rightWristX, rightWristY, 10);
    current_vol = Number(rightWristY);
    volume_sound= (500- current_vol)/500;
    console.log(current_vol);
    console.log(volume_sound);
    final_value= volume_sound.toFixed(2) * (-10);
    console.log(final_value);
    document.getElementById('volume').innerHTML= "Volume = " + final_value;
    }

    if (leftWristScore > 0.001){
        circle(leftWristX,leftWristY,10);

        if (leftWristY> 0 && leftWristY <= 100){
            song.rate(0.5);
            document.getElementById('speed').innerHTML= "Speed = 0.5x";
        }

        else if (leftWristY> 100 && leftWristY <= 200){
            song.rate(1);
            document.getElementById('speed').innerHTML= "Speed = 1x";
        }

        else if (leftWristY> 200 && leftWristY <= 300){
            song.rate(1.5);
            document.getElementById('speed').innerHTML= "Speed = 1.5x";
        }

        else if (leftWristY> 300 && leftWristY <= 400){
            song.rate(2);
            document.getElementById('speed').innerHTML= "Speed = 2x";
        }

        else if (leftWristY> 400){
            song.rate(2.5);
            document.getElementById('speed').innerHTML= "Speed = 2.5x";
        }
    }
    
}

song= " ";

function preload(){
song = loadSound("music.mp3");
}

function Play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded(){
    console.log('pose net is initialized');
}

function StopS(){
    song.stop();
}

function gotResults(results){
    if (results.length > 0){
        console.log(results);
        leftWristScore= results[0].pose.keypoints[9].score;
        rightWristScore= results[0].pose.keypoints[10].score;
        console.log("left Wrist score = " + leftWristScore + "right wrist score" + rightWristScore);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("LWX= " + leftWristX + "LWY= " + leftWristY);
        console.log("RWX" + rightWristX + "RWY" + rightWristY);

    }
}