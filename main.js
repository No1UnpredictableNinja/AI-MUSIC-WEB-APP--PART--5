girls_like_you_song = "";
anyone_song = "";
leftWrist_x = 0;
leftWristY = 0;
rightWrist_x = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_girls_like_you = "";
scorerleftWrist = 0;
song_anyone = "";

function setup(){
    canvas = createCanvas(600, 530);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){
    girls_like_you_song = loadSound("music.mp3");
    anyone_song = loadSound("music1.mp3");
}

function draw(){
    image(video, 0, 0, 600, 530);

    fill("#0df4fc");
    stroke("#fa9507");
    
    song_girls_like_you = song_girls_like_you.isPlaying();
    console.log("Girls Like You Song = "+song_girls_like_you);

    song_anyone = song_anyone.isPlaying();
    console.log("Anyone Song = "+song_anyone);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        anyone_song.stop()
        if(song_girls_like_you == false)
        {
            girls_like_you_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Girls Like You Song";
        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        girls_like_you_song.stop()
        if(song_anyone == false)
        {
            anyone_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name: Anyone Song";
        }
    }
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist_Score = "+scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("rightWrist_Score = "+scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = " + leftWrist_x +" leftWrist_y = "+ leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = " + rightWrist_x +" rightWrist_y = "+ rightWrist_y);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}


