var appDiv; // variable to store the div containing the app
var p5AppCanvas; // variable to store the p5 canvas
var appWidth; // variable to store the width of the div holding the visualization
var appHeight; // variable to store the height of the div holding the visualization

var cors = 'https://cors-anywhere.herokuapp.com/'; // CORS workaround (https://www.freecodecamp.org/forum/t/solved-having-trouble-getting-response-from-dark-sky-api/100653/5)
var URL = 'https://api.darksky.net/forecast/'; // base URL for the API call
var APIkey = '324fe712c4a54ca39e46d92fe860b9b1'; // key for the API call (this will need to be hidden in the future)
var exclude = 'exclude=minutely,hourly,daily,alerts,flags'; // exluding parts of the API call we don't need (minimize the data)
var units = 'units=si'; // use the metric unit system
var lat = "49.267123";
var long = "-123.094782";
var API;

var button;
var inputLat, inputLong;

var red = 0;
var humid;
var ballArray = [];

var temp;

var sliderLat, sliderLong; 


function setup() {

    appDiv = select('#p5'); // selecting the div with the ID 'p5' and store it inside appDiv
    createNewCanvas(); // create a new canvas
    background(0); // set background to black initially, to avoid fade
    API = cors + URL + APIkey + '/' + lat + "," + long + '?' + units + '&' + exclude; // put together the API call
    loadData();
    setInterval(loadData, 120000);

    button = createButton("Load Data"); // our button
    button.mousePressed(loadData);
    button.parent("sidebar");

    inputLat = createInput(); //input
    inputLat.value(lat)
    inputLat.parent("sidebar");

    inputLong = createInput(); //input
    inputLong.value(long)
    inputLong.parent("sidebar");

    sliderLat = createSlider(-90, 90, lat, 0.0); //slider
    sliderLat.value(lat);
    sliderLat.parent("sidebar");

    sliderLong = createSlider(-180, 80, long, 0.0 ); //slider
    sliderLong.value(long);
    sliderLong.parent("sidebar");

}

function draw() {

    background(red, 0, 0, humid); // set background to black with 10/255 opacity

    lat = sliderLat.value(); // put the slider values into the lat & long variables
    long = sliderLong.value();

    inputLat.value(lat); // draw lat & long values into the imput feilds
    inputLong.value(long);

    for (let i = 0; i < ballArray.length; i++) {

        ballArray[i].show();
        ballArray[i].move();
        ballArray[i].update();

    }
    
    API = cors + URL + APIkey + '/' + lat + "," + long + '?' + units + '&' + exclude; // put together the API call with updated input values from our text field

}

function createNewCanvas() {
    appWidth = appDiv.size().width; // store the current width of 'appDiv' in 'appWidth'
    appHeight = appDiv.size().height; // store the current height of 'appDiv' in 'appHeight'

    p5AppCanvas = createCanvas(appWidth, appHeight); // creating a new canvas and storing the result inside p5AppCanvas
    p5AppCanvas.parent(appDiv); // assign the parent element of 'p5AppCanvas' to 'appDiv'
}
function windowResized() {
    p5AppCanvas.remove(); // remove the current canvas when the window is resized
    createNewCanvas(); // create a new canvas
}

function loadData() {
    loadJSON(API, gotData, error);

}

function gotData(d) {

    let icon = d.currently.icon; 

    switch (icon) {
        case "rain" :
            rain();
            break;
        case "cloudy" :
            cloudy();
            break;
        case "clear-day" :
            clearDay();
            break;
        default:
            cloudy();
            break;
    }

    console.log(d);
    //do with stuff with the data here

    document.getElementById("timeZoneSpan").textContent = d.timezone;
    document.getElementById("windSpeedSpan").textContent = d.currently.windSpeed;
    document.getElementById("tempSpan").textContent = d.currently.temperature;
    document.getElementById("humiditySpan").textContent = d.currently.humidity;
    document.getElementById("summarySpan").textContent = d.currently.summary;

    humid = d.currently.humidity * 20;
    red = map(d.currently.temperature, -30, 30, 0, 255);
    temp = d.currently.temperature;

  
}

function error(e) {
    console.log(e);
}

class ball {

    constructor(x, y, r, xspeed, yspeed) { //create arguments so we can change them dynamically later on 
        this.x = x; // assign the variable to the argument so we can receiv the arguments
        this.y = y;
        this.r = r;
        this.xspeed = xspeed;
        this.yspeed = yspeed;

    }


    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    show() {
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    update() {
        if (this.x > width - this.r || this.x < this.r) {
            this.xspeed = -this.xspeed;
        }
        if (this.y > height - this.r || this.y < this.r) {
            this.yspeed = -this.yspeed;
        }
    }
}


function rain(){

    ballArray = []; // clear the array 

    for (let i = 0; i < temp; i++) { // take the temp variable and make our array that size 

        ballArray[i] = new ball(width/2, 100, i*2 , i / 0.05, i * 0.2); // create new ball objects, according to the size of the array

    }

}

function cloudy(){

    ballArray = [];

    for (let i = 0; i < temp; i++) {

        ballArray[i] = new ball(360, 160, 25, i * 0.2, i * 0.5);

    }

}

function clearDay(){

    ballArray = [];

    for (let i = 0; i < temp; i++) {

        ballArray[i] = new ball(360, 160, i*3, i * 2, i * 0.5);

    }

}

function keyPressed() {

    console.log(keyCode)

    if(keyIsDown(49)){
        rain();
    }else if (keyIsDown(50)) {
        cloudy();
    }else if (keyIsDown(51)) {
        clearDay();
    }

}