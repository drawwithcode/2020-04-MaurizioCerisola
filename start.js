//images
var hangman;
var wallpaper;
// button
var button;
//div
var div;

function preload(){
  hangman = loadImage("assets/images/hangman_11.png");
  wallpaper = loadImage("assets/images/hangman_0.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  let diagonal = pow(pow(windowWidth,2)+pow(windowHeight,2), 0.5);
  //Button
  button = createButton("START");
  let xSizeB = windowWidth/6;
  let ySizeB = windowHeight/13;
  button.size(xSizeB, ySizeB);
  button.position(windowWidth/2-xSizeB/2, windowHeight*2/3-ySizeB/2);
  button.style("font-size", diagonal/60+"px");
  button.style("font-family", "Comic Sans MS");
  button.style('background-color', color("#38b000"));
  button.style("text-align", "center");
  button.mousePressed(function() {
    window.open("main.html", "_self");
  });
  // Div
  div = createDiv("The HangMan Game");
  let xSizeD = windowWidth/3;
  let ySizeD = windowHeight/11;
  div.size(xSizeD, ySizeD);
  div.position(windowWidth/2-xSizeD/2, windowHeight/8-ySizeD/2);
  div.style("font-size", diagonal/30+"px");
  div.style("border", diagonal/200+"px solid black");
  div.style("font-family", "Comic Sans MS");
  div.style("text-align", "center");
}

function draw() {
  let diagonal = pow(pow(windowWidth, 2) + pow(windowHeight, 2), 0.5);
  // wallpaper
  let wpHeight = windowHeight;
  let wpWidth = wpHeight / wallpaper.height * wallpaper.width;
  image(wallpaper, windowWidth / 2, windowHeight / 2, wpWidth, wpHeight);
  // Image
  let hangmanHeight = windowHeight / 2;
  let hangmanWidth = hangmanHeight / hangman.height * hangman.width;
  image(hangman, windowWidth / 2, windowHeight * 2 / 5, hangmanWidth, hangmanHeight);
  // resize Button
  let xSizeB = windowWidth / 6;
  let ySizeB = windowHeight / 13;
  button.size(xSizeB, ySizeB);
  button.position(windowWidth / 2 - xSizeB / 2, windowHeight * 2 / 3 - ySizeB / 2);
  button.style("font-size", diagonal / 60 + "px");
  // resize Div
  let xSizeD = windowWidth / 3;
  let ySizeD = windowHeight / 11;
  div.size(xSizeD, ySizeD);
  div.position(windowWidth / 2 - xSizeD / 2, windowHeight / 8 - ySizeD / 2);
  div.style("font-size", diagonal / 40 + "px");
  div.style("border", diagonal / 200 + "px solid black");
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
