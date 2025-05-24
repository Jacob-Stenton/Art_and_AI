let imageModelURL = 'https://teachablemachine.withgoogle.com/models/IRyQUxEKY/';
let classifier;
let video;
let label;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480); //a common resolution for webcams
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start classifying the video
  classifier.classifyStart(video, gotResult);
}

// A function to run when we get the results and any errors
function gotResult(results) {
  // Update the label variable which is displayed on the canvas
  label = results[0].label;
}

function draw() {
  image(video, 0, 0, width, height);
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}
