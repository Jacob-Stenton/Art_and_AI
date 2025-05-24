
let handPoseModel;
let video;
let hands = [];

function preload() {
  handPoseModel = ml5.handPose()
}

function setup() {
  createCanvas(400, 400);

  //video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handPoseModel.detectStart(video, gotHands);
}

function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height); //draw webcam video

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i]
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

