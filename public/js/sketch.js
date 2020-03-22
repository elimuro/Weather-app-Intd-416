var appDiv; // variable to store the div containing the app
var p5AppCanvas; // variable to store the p5 canvas
var appWidth; // variable to store the width of the div holding the visualization
var appHeight; // variable to store the height of the div holding the visualization

var cors = "https://cors-anywhere.herokuapp.com/"; // work around to get darksky working from our app
var APIkey = 'YOUR API KEY HERE'; // your api key from dark sky
var exclude = "exclude=minutely,hourly,daily,alerts,flags"; // exclude some data that we dont need
var units = "units=si" // use the metric system 
var lat_long = "49.267123,-123.094782"; // long and lat for Vancouver
var URL = 'https://api.darksky.net/forecast/'; // bas url for the API call
var API; // variable for the full  api string 

var button; // variable for our p5 button and input field
var input;

var red = 0; // variable to we can change the background colour with data later 

let x = 320; // ball stuff
let y = 180;
let xspeed = 5;
let yspeed = 2;
let r = 25;




function setup() {

    appDiv = select('#p5'); // selecting the div with the ID 'p5' and store it inside appDiv
    createNewCanvas(); // create a new canvas
    background(0); // set background to black initially, to avoid fade
    API = cors + URL + APIkey + '/' + lat_long + '?' + units + '&' + exclude; // put together the API call
    loadData(); // load the data when the program starts
    setInterval(loadData, 120000); // execute load data on a timer (in milliseconds)

    button = createButton("Load Data"); // create p5 button and speficfy the text inside it
    button.mousePressed(loadData); // what happens when the mouse presses the button
    button.parent("sidebar"); // where (what container) to draw the button

    input = createInput(); // create p5 input field
    input.value(lat_long) // intialize the field with some data, in this case the long and lat for Vancouver
    input.parent("sidebar"); //where (what container) to draw the button


}

function draw() {

    background(red, 0, 0, 10); // set background to black with 10/255 opacity


    ellipse(x, y, r * 2, r * 2);
    x += xspeed;
    y += yspeed;
    if (x > width - r || x < r) {
        xspeed = -xspeed;
    }
    if (y > height - r || y < r) {
        yspeed = -yspeed;
    }

    lat_long = input.value();
    API = cors + URL + APIkey + '/' + lat_long + '?' + units + '&' + exclude; // put together the API call with updated input values from our text field



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

function loadData(){
    loadJSON(API, gotData, error);

}

function gotData(d){

    console.log(d);
//do with stuff with the data here

    document.getElementById("timeZoneSpan").textContent = d.timezone;
    document.getElementById("windSpeedSpan").textContent = d.currently.windSpeed;
    document.getElementById("tempSpan").textContent = d.currently.temperature;
    document.getElementById("humiditySpan").textContent = d.currently.humidity;
    document.getElementById("summarySpan").textContent = d.currently.summary;
    xspeed = d.currently.windSpeed * 5;

    r = d.currently.humidity * 20;
    red = map(d.currently.temperature, -30, 30, 0, 255);



}

function error(e){
    console.log(e);
}
