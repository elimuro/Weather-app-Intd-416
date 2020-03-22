var appDiv; // variable to store the div containing the app
var p5AppCanvas; // variable to store the p5 canvas
var appWidth; // variable to store the width of the div holding the visualization
var appHeight; // variable to store the height of the div holding the visualization

var cors = "https://cors-anywhere.herokuapp.com/";
var APIkey = '<YOUR API KEY HERE';
var exclude = "exclude=minutely,hourly,daily,alerts,flags";
var units = "units=si" // use the metric system
var lat_long = "49.267123,-123.094782";
var URL = 'https://api.darksky.net/forecast/';
var API;

var button;
var input;

var red = 0;

let x = 320;
let y = 180;
let xspeed = 5;
let yspeed = 2;
let r = 25;




function setup() {

    appDiv = select('#p5'); // selecting the div with the ID 'p5' and store it inside appDiv
    createNewCanvas(); // create a new canvas
    background(0); // set background to black initially, to avoid fade
    API = cors + URL + APIkey + '/' + lat_long + '?' + units + '&' + exclude; // put together the API call
    loadData();
    setInterval(loadData, 120000);

    button = createButton("Load Data"); // our button
    button.mousePressed(loadData);
    button.parent("sidebar");

    input = createInput(); //input
    input.value(lat_long)
    input.parent("sidebar");


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
