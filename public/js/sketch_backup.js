let particleArr = []; // var to store a ball object
let p5Div; // variable to hold the div with the id "p5"
let p5Canvas; // var to store the p5 canvas in
let particleNum; // variable to store the number of particles to generate
let canvasWidth, canvasHeight; // variable to store the current dimension of the canvas
let currentMode = 0; // variable to store the current weather mode
let tempP, latP, longP; // variables to store HTML <p> elements

function preload() {
  //preload function which is executed before the app runs
  let URL = 'https://api.darksky.net/forecast'; // variable for the API URL
  let key = '3a01d9d1f25578775e371597417f92f1'; // variable storing the API key -> needs to be in separate file
  let lat = '49.7016'; // latitude of requested location
  let lon = '-123.1558'; // longitude of requested location
  let exclude = 'exclude=currently,minutely,hourly,alerts,flags'; // exclude current weather, minutely forecast, hourly forecast, alerts, and flags
  let units = 'units=si'; // use the metric system

  let API_Call = URL + '/' + key + '/' + lat + ',' + lon + '?' + exclude + '?' + units; // putting the API call together
  //loadJSON('data.json', compileData); // run the API call as an asynchroneous function and call the compileData function once complete
}

function compileData(data) {
  // function to compile the incoming data which is stored in the local variable 'data'
  console.log(data); // print the data for debugging purposes
  for(let day of data.daily.data) { // loop through all data.data entries inside the JSON file
    console.log(day.icon); // console log the icon of the weather forecast
  }
  tempP = select("#temp");
  latP = select("#lat");
  longP = select("#long");
  
  tempP.html(data.timezone);
  latP.html(data.latitude);
  longP.html(data.longitude);
}

function setup() {
  // put setup code here
  particleNum = sq(14);
  p5Div = select("#p5"); // store the div with the ID "p5" inside the variable p5Div
  createNewCanvas(); // function to create canvas
  for(let i=0; i<particleNum; i++) { // for loop to generate 'particleNum' particles
    particleArr[i] = new Particle(i); // create a new instance of Particle and store it inside the particle array
  }
  smooth(); // draw everything smoothly (anti-aliasing)
  noStroke(); // draw without outline unless spcifically noted
  background(0); // set the background to white (because we use transparency in the draw loop)
}

function draw() {
  // put drawing code here
  background(0,5); // set the background to black
  for(let particle of particleArr) {
    particle.show(); // call the show function of 'particle'
    particle.update(); // call the update function of 'particle'
  }
}

function windowResized() {
  // function called when the window is resized
  p5Canvas.remove(); // remove the current canvas
  createNewCanvas(); // function to create canvas
}

function createNewCanvas() {
  canvasWidth = p5Div.size().width; // get the width of p5Div and store it inside canvasWidth
  canvasHeight = p5Div.size().height; // get the width of p5Div and store it inside canvasHeight

  p5Canvas = createCanvas(canvasWidth, canvasHeight); // create a new canvas using canvasWidth and canvasHeight
  p5Canvas.parent("p5"); // assign p5Canvas to p5

  setMode();

  background(0); // set the background to white (because we use transparency in the draw loop)
}

function keyPressed() {
  console.log(keyCode); // 49 = wait
  switch(keyCode) {
    case 49:
      console.log("wait");
      currentMode = 0;
      setMode();
      break;
    case 50:
      console.log("sun");
      currentMode = 1;
      setMode();
      break;
    case 51:
      console.log("rain");
      currentMode = 2;
      setMode();
      break;
    case 52:
      console.log("wind");
      currentMode = 3;
      setMode();
      break;
    default:
      console.log("not set");
      currentMode = 4;
      setMode();
      break;
  }
}

function setMode() {
  background(0);
  
  for(let particle of particleArr) {
    // set new mode for particles
    particle.setParticleMode(currentMode);
  }
}