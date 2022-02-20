video = "";
objects = [];

function preload()
{
video = createVideo('video.mp4');
}

function setup()
{
    canvas = createCanvas(480,360);
    canvas.center();
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 360);
}

if (status != "")
{
r = random(255);
g = random(255);
b = random(255);
    objectDetector.detect(video, gotResult);
    for( i = 0; i< objects.length; i++)
    {
        
        document.getElementById("status").innerHTML = "status: detected objects";
        document.getElementById("num_of_objects").innerHTML = "number of detected objects are:" + objects.length;


        fill(rgb);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(rgb);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}