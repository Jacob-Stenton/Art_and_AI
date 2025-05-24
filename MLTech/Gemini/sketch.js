/**
 * This p5.js sketch integrates with the Google Gemini API to generate text responses
 * based on your prompt and the current canvas content.
 * See notes inside geminiAPI.js for how to obtain your own key
 */

let lastResponse = "";
let sendCanvas = false; // toggle whether we want to send canvas or not

let wordInput;
let xPos;
let yPos;

let leftField;
let rightField;
let inputField;

function setup() {
  // Create the p5.js canvas and place it within the 'canvas-container' div
  createCanvas(500, 500);
  background(230);


  leftField = createInput('')
  leftField.attribute('value', "sweet")
  leftField.position(50, 400)
  leftField.size(100)

  rightField = createInput('')
  rightField.attribute('value', "sour")
  rightField.position(350, 400)
  rightField.size(100)
  rightField.style('text-align', 'right')

  inputField = createInput('')
  inputField.attribute('value', "lime")
  inputField.position(200, 100)
  inputField.size(100)
  inputField.style('text-align', 'center')

  let sortButton = createButton('Sort');
  sortButton.position(200, 130);
  sortButton.size(108, 50);
  sortButton.mousePressed(sendSortRequest); // Add this line
}

function draw() {
  // Clear the area where the word is drawn
  fill(230); // Use the same color as the background
  noStroke();
  rect(0, 300, width, 100); // Adjust the rectangle size as needed

  // Draw the 2x2 axis
  stroke("black");
  line(50, 380, 450, 380);
  // add arrows to either side
  fill("black")
  // Left arrow pointing right
  triangle(40, 380, 50, 370, 50, 390)
  line(40, 380, 60, 380)
  // Right arrow pointing left
  triangle(460, 380, 450, 370, 450, 390)
  line(440, 380, 460, 380)

  // Draw the new word
  fill("black");
  textSize(20);
  textAlign(CENTER, CENTER);
  text(wordInput, xPos, yPos);
}


// Got new response from Gemini
function onGeminiResponse(response) {
  lastResponse = response;
  console.log(response);

  // Given the response, update the position of the sorted word
  xPos = map(response, 0, 100, 50, 450);
  yPos = 350;
  wordInput = inputField.value(); // Update wordInput with current input value
}

function sendSortRequest() {
  let leftInput = leftField.value();
  let rightInput = rightField.value();
  let entity = inputField.value();

  let prompt = `We are sorting an entity from ${leftInput} to ${rightInput}. A value of 0 means that the entity is fully ${leftInput}. A value of 100 means the entity is fully ${rightInput}. Provide a number to accurately classify the entity on the sliding scale of the two ends of the spectrum.

Provide a number between 0 and 100 in your response. Do not respond with anything more than the number.

Entity: ${entity}
Value:`;

  console.log(prompt)
  askGemini(prompt, false);
}