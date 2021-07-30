song = "";
leftwristX = 0;
rightwristX = 0;
leftwristY = 0;
rightwristY = 0;
scoreleftwrist = "";
scorerightwrist = "";
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('yellow');
    if (scoreleftwrist > 0) {
        circle(leftwristX, leftwristY, 20);
        numberleftwristY = Number(leftwristY);
        removedecimals = floor(numberleftwristY);
        volume = removedecimals / 500;
        document.getElementById("vol").innerHTML = volume;
        song.setVolume(volume);
    }
    if (scorerightwrist > 0) {


        if (rightwristY > 0 && rightwristY < 100) {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightwristY > 100 && rightwristY < 200) {
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        else if (rightwristY > 200 && rightwristY < 300) {
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightwristY > 300 && rightwristY < 400) {
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        else {
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function start() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelloaded() {
    console.log("model is loaded");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
    }
}