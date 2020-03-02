var appDiv; // variable to store the div containing the app
var p5AppCanvas; // variable to store the p5 canvas
var appWidth; // variable to store the width of the div holding the visualization
var appHeight; // variable to store the height of the div holding the visualization

var particles = []; // create an empty array called particles
var particleNum = 14*14; // var to store the number of particles

var currentMode = 0; // variable to store the current visualization mode

var cors = 'https://cors-anywhere.herokuapp.com/'; // CORS workaround (https://www.freecodecamp.org/forum/t/solved-having-trouble-getting-response-from-dark-sky-api/100653/5)
var URI = 'https://api.darksky.net/forecast/'; // base URI for the API call
var APIkey = '3a01d9d1f25578775e371597417f92f1'; // key for the API call (this will need to be hidden in the future)
var exclude = 'exclude=minutely,hourly,daily,alerts,flags'; // exluding parts of the API call we don't need
var units = 'units=si'; // use the metric unit system
var lat_long = '49.2827,-123.1207'; // latitude and longitude for Vancouver, BC

var API; // variable to store the API string

function setup() {
    appDiv = select('#p5'); // selecting the div with the ID 'p5' and store it inside appDiv
    createNewCanvas(); // create a new canvas

    for(let i=0; i<particleNum; i++) { 
        particles.push(new Particle(i)); // create a new particle and push it into the particles array
    }

    API = cors + URI + APIkey + '/' + lat_long + '?' + units + '&' + exclude; // put together the API call
    loadData(); // load the data right away when the program starts
    setInterval(loadData,120000); // set an interval which allws an API call every two minutes to update the weather data (this is based on 1000 free calls / day)
    background(0); // set background to black initially, to avoid fade
}

function draw() {
    background(0,10); // set background to black with 10/255 opacity

    for(let i=0; i<particles.length; i++) { // cycle through all particles
        particles[i].show(); // call the show function of the current particle
        particles[i].update(); // call the update function of the current particle
    }
}

function createNewCanvas() {
    appWidth = appDiv.size().width; // store the current width of 'appDiv' in 'appWidth'
    appHeight = appDiv.size().height; // store the current height of 'appDiv' in 'appHeight'

    p5AppCanvas = createCanvas(appWidth,appHeight); // creating a new canvas and storing the result inside p5AppCanvas
    p5AppCanvas.parent(appDiv); // assign the parent element of 'p5AppCanvas' to 'appDiv'
}

function windowResized() {
    p5AppCanvas.remove(); // remove the current canvas when the window is resized
    createNewCanvas(); // create a new canvas
    setMode(currentMode); // call the setMode function
}

function setMode(newMode) {
    background(0) // refresh the background to black
    for(let i=0; i<particles.length; i++) { // cycle through all particles
        particles[i].setParticleMode(newMode); // call the setParticleMode function after the window has been resized
    }
}

function keyPressed() {
    console.log(keyCode); //
    if(keyIsDown(49)) {
        currentMode = 0; // wait mode
    } else if (keyIsDown(50)) {
        currentMode = 1; // wait mode
    } else if (keyIsDown(51)) {
        currentMode = 2; // wait mode
    } else if (keyIsDown(52)) {
        currentMode = 3; // wait mode
    } else { 
        currentMode = 0; // wait mode
    }
    setMode(currentMode); // update particles with currentMode
}

function loadData() {
    loadJSON(API, gotData, error); // make API call and provide callback function
}

function gotData(d) {
    let weather = d.currently.icon; // read the current weather and store it inside weather (clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night)
    if (weather == 'cloudy') {
        setMode(1);
    } else {
        setMode(0);
    }
}

function error(e) {
    console.log(e);
}