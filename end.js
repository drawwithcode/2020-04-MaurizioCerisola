// images
var wallpaper;
var hat;
// URL
const urlString = window.location.href;
let url = new URL(urlString);
var parameter1 = url.searchParams.get("victory");
var pickedWord = url.searchParams.get("pickedWord");
var victory = JSON.parse(parameter1);
// button
var button;
// Div
var div;
var divP;

function preload(){
  wallpaper = loadImage("assets/images/hangman_0.png");
  if (victory) {
    hat = loadImage("assets/images/crown.png");
  }
  else {
    hat = loadImage("assets/images/donkey.png");
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  let diagonal = pow(pow(windowWidth, 2) + pow(windowHeight, 2), 0.5);
  // webcam
  capture = createCapture(VIDEO);
  capture.hide();
  // Button
  let xSizeB = windowWidth/6;
  let ySizeB = windowHeight/13;
  button = createButton("PLAY AGAIN");
  button.size(xSizeB, ySizeB);
  button.position(windowWidth/2-xSizeB/2, windowHeight*2/3-ySizeB/2+windowHeight/9);
  button.style("font-size", diagonal/60+"px");
  button.style("font-family", "Comic Sans MS");
  button.style('background-color', color("#38b000"));
  button.mousePressed(function() {
    window.open("main.html", "_self");
  });
  // Div
  let xSizeD = windowWidth/3;
  let ySizeD = windowHeight/11;
  let text;
  if (victory) {
    text= "YOU WON!";
  }
  else {
    text="YOU LOST!"
  }
  div = createDiv(text);
  div.size(xSizeD, ySizeD);
  div.position(windowWidth/2-xSizeD/2, windowHeight/8-ySizeD/2-windowHeight/20);
  div.style("font-size", diagonal/30+"px");
  div.style("font-family", "Comic Sans MS");
  div.style("border", diagonal/200+"px solid black");
  div.style("text-align", "center");
  // Div picked word
  let outputText = "The word was: " + pickedWord;
  let xSizeDP = outputText.length*windowWidth/40;
  let ySizeDP = windowHeight/11;
  divP = createDiv(outputText);
  divP.size(xSizeDP, ySizeDP);
  divP.position(windowWidth/2-xSizeDP/2, windowHeight*2/3-ySizeDP/2);
  divP.style("font-size", diagonal/30+"px");
  divP.style("font-family", "Comic Sans MS");
  divP.style("text-align", "center");

}

function draw() {
  let diagonal = pow(pow(windowWidth, 2) + pow(windowHeight, 2), 0.5);
  // wallpaper
  let wpHeight = windowHeight;
  let wpWidth = wpHeight/wallpaper.height*wallpaper.width;
  image(wallpaper, windowWidth/2, windowHeight/2, wpWidth, wpHeight);
  // resize Button
  let xSizeB = windowWidth/6;
  let ySizeB = windowHeight/13;
  button.size(xSizeB, ySizeB);
  button.position(windowWidth/2-xSizeB/2, windowHeight*2/3-ySizeB/2+windowHeight/9);
  button.style("font-size", diagonal/60+"px");
  // resize Div
  let xSizeD = windowWidth/3;
  let ySizeD = windowHeight/11;
  div.size(xSizeD, ySizeD);
  div.position(windowWidth/2-xSizeD/2, windowHeight/8-ySizeD/2-windowHeight/20);
  div.style("font-size", diagonal/30+"px");
  div.style("border", diagonal/200+"px solid black");
  // resize Div picked word
  let outputText = "The word was: " + pickedWord;
  let xSizeDP = outputText.length*windowWidth/40;
  let ySizeDP = windowHeight/11;
  divP.size(xSizeDP, ySizeDP);
  divP.position(windowWidth/2-xSizeDP/2, windowHeight*2/3-ySizeDP/2);
  divP.style("font-size", diagonal/30+"px");
  //webcam
  if (capture.loadedmetadata) {
    let camHeight = windowHeight*2/5;
    let camWidth = camHeight/capture.height * capture.width;
    image(capture, windowWidth/2, windowHeight*2/5, camWidth, camHeight);
  }
  //hat
  let hatHeight;
  let hatWidth;
  if (victory){
     hatHeight = windowHeight/7;
     hatWidth = hatHeight/wallpaper.height*wallpaper.width;
  }
  else {
    hatHeight = windowHeight/4;
    hatWidth = hatHeight/wallpaper.height*wallpaper.width;
  }
  image(hat, windowWidth/2, windowHeight*2/5 - windowHeight/8, hatWidth, hatHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
