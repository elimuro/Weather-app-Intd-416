var appDiv; // variable to store the div containing the app
var p5AppCanvas; // variable to store the p5 canvas
var appWidth; // variable to store the width of the div holding the visualization
var appHeight; // variable to store the height of the div holding the visualization
var button, input; // create variables for button and input field

var sliderLat, sliderLong; // make couple variables for our sliders
var ballArray = []; //create an array for our ball objects

var red = 0;
var humid = 0;
var weather;
var temp; 

var cors = 'https://cors-anywhere.herokuapp.com/'; // CORS workaround (https://www.freecodecamp.org/forum/t/solved-having-trouble-getting-response-from-dark-sky-api/100653/5)
var URL = 'https://api.darksky.net/forecast/'; // base URL for the API call
var APIkey = '324fe712c4a54ca39e46d92fe860b9b1'; // key for the API call (this will need to be hidden in the future)
var exclude = 'exclude=minutely,hourly,daily,alerts,flags'; // exluding parts of the API call we don't need (minimize the data)
var units = 'units=si'; // use the metric unit system
var lat = '49.2827';
var long = '-123.1207'; // latitude and longitude for Vancouver, BC

var API; // variable to store the API string

function setup() {
    appDiv = select('#p5'); // selecting the div with the ID 'p5' and store it inside appDiv
    createNewCanvas(); // create a new canvas
    API = cors + URL + APIkey + '/' + lat + ',' + long + '?' + units + '&' + exclude; // put together the API call
    loadData(); // load the data right away when the program starts
    setInterval(loadData, 120000); // set an interval which allws an API call every two minutes to update the weather data (this is based on 1000 free calls / day)
    background(0); // set background to black initially, to avoid fade



    inputLat = createInput(); //create an input field
    inputLat.value(lat); ///make the initial value of the field be the lat for vancouver
    inputLat.parent("sidebar");

    inputLong = createInput(); //create an input field
    inputLong.value(long); ///make the initial value of the input be the long for vancouver
    inputLong.parent("sidebar");


    sliderLat = createSlider(-90, 90, lat, 0.0); //create a p5 slider 
    sliderLat.value(lat);  ///make the initial value of the slider be the lat for vancouver
    sliderLat.parent("sidebar");

    sliderLong = createSlider(-180, 80, long, 0.0); //create a p5 slider
    sliderLong.value(long); ///make the initial value of the slider be the lling for vancouver
    sliderLong.parent("sidebar");

    button = createButton('Load Data'); //create an button element in the button variable and put some text in it
    button.mousePressed(loadData);// when the button is pressed execute the loadData function
    button.parent("sidebar");


}

function draw() {

    background(red, 0, 0, humid); // set background to use the red variable 

    for (let i = 0; i < ballArray.length; i++) { // because loadData & subsequently gotData are called in setup an our program already knows how long the array is. 
        ballArray[i].show();
        ballArray[i].update();
        ballArray[i].move();
    }


    lat = sliderLat.value(); // put the slider values into the lat & long variables
    long = sliderLong.value();

    inputLat.value(lat); // draw lat & long values into the imput feilds
    inputLong.value(long);

    API = cors + URL + APIkey + '/' + lat + ',' + long + '?' + units + '&' + exclude; // put together the API call with updated input values from our text field





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
    loadJSON(API, gotData, error); // make API call and provide callback function

}


function gotData(d) {

    weather = d.currently.icon; // read the current weather and store it inside weather (clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night)

    console.log(d); // log our data so we can see it in the browser when we inspect it
    console.log(weather);


    switch (weather) {
        case "rain":
            rain();
            break;
        case "clear-night":
            animation_1();
            break;
        case "cloudy":
            rain();
            break;
        default:
            wait();
            break;
    }


    document.getElementById('timeZoneSpan').textContent = d.timezone;
    document.getElementById('windSpeedSpan').textContent = d.currently.windSpeed;
    document.getElementById('tempSpan').textContent = d.currently.temperature;
    document.getElementById('humiditySpan').textContent = d.currently.humidity;
    document.getElementById('summarySpan').textContent = d.currently.summary;
    document.getElementById('iconSpan').textContent = d.currently.icon;


    red = map(d.currently.temperature, 0, 40, 0, 255);
    humid = map(d.currently.humidity, 0, 1, 100, 0);
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


function wait() {

    ballArray = []; // clear the array 
    for (let i = 0; i < temp; i++) { // 

        ballArray[0] = new ball(width / 2, height / 2, 100, 0, 0); // create new ball objects,

    }

}

function animation_1() {

    ballArray = []; // clear the array 
    for (let i = 0; i < temp; i++) { // take the temp variable and make our array that size 

        ballArray[i] = new ball(320, 160, 25 , i * 0.8, i); // create new ball objects, according to the size of the array

    }


}

function rain() {

    ballArray = []; // clear the array 
    for (let i = 0; i < temp; i++) { // take the temp variable and make our array that size 

        ballArray[i] = new ball(width/2, 100, i*2 , i /0.05, i * 0.2); // create new ball objects, according to the size of the array

    }
}


function keyPressed() {
    console.log(keyCode); //
    if (keyIsDown(49)) {
        wait();
    } else if (keyIsDown(50)) {
        animation_1();
    } else if (keyIsDown(51)) {
        rain();
    } else {
        wait();
    }
}


