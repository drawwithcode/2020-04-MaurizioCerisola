//images
var hangmans = [];
var wallpaper;
// datasets
var alphabet;
var words;
// Buttons
var buttons = [];
// Div
var div;
// other
var outputText = "_";
var pickedWord;
var won = false;
var lost = false;
var errors=0;
var n=11;
// URL
const urlString = window.location.href;
let url = new URL(urlString);

function preload(){
  // images
  for (let i=0; i<=n; i++) {
    let hangman = loadImage("assets/images/hangman_"+i+".png");
    hangmans.push(hangman);
  }
  wallpaper = loadImage("assets/images/hangman_0.png");
  // datasets
  alphabet = loadJSON("assets/data/alphabet.json");
  words = loadJSON("assets/data/hangman_words.json");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  let diagonal = pow(pow(windowWidth,2)+pow(windowHeight,2), 0.5);
  // Buttons
  for(let i=0; i<alphabet["alphabet"].length; i++) {
    buttons.push(createButton(alphabet["alphabet"][i]["letter"]));
    let xSizeB = windowWidth/30;
    let ySizeB = xSizeB;
    buttons[i].size(xSizeB, ySizeB);
    let xPosition;
    let yPosition;
    if (round(i/alphabet["alphabet"].length)==0) {
      xPosition = map(i, -1, floor(alphabet["alphabet"].length/2), windowWidth/6, windowWidth/6*5);
      yPosition = windowHeight/3*2;
    }
    else {
      xPosition = map(i, floor(alphabet["alphabet"].length/2)-1, alphabet["alphabet"].length, windowWidth/6, windowWidth/6*5);
      yPosition = windowHeight/3*2 + windowHeight/10;
    }
    buttons[i].position(xPosition-xSizeB/2, yPosition-ySizeB/2);
    buttons[i].style("font-size", diagonal/60+"px");
    buttons[i].style("font-family", "Comic Sans MS");
    buttons[i].style("text-align", "center");
    buttons[i].id(alphabet["alphabet"][i]["letter"]);
    buttons[i].mousePressed(function() {
      check(buttons[i].id());
      buttons[i].attribute('disabled','true');
    });
  }
  // pick a random word from the dataset
  pickedWord = random(words["words"])["word"];
  //pickedWord = "PICKED";
  // Div
  for (let i=1; i<pickedWord.length; i++) {
    outputText += " _";
  }
  let xSizeD = pickedWord.length*windowWidth/25;
  let ySizeD = windowHeight/11;
  div = createDiv(outputText)
  div.size(xSizeD, ySizeD);
  div.position(windowWidth/2-xSizeD/2, windowHeight/8-ySizeD/2);
  div.style("font-size", diagonal/30+"px");
  div.style("font-family", "Comic Sans MS");
  div.style("border", diagonal/200+"px solid black");
  div.style("text-align", "center");
}

function draw() {
  let diagonal = pow(pow(windowWidth,2)+pow(windowHeight,2), 0.5);
  // won/lost check
  if (won || lost) {
    console.log("gioco finito");
    //window.open("end.html?victory=" + won +"&pickedWord=" + pickedWord, "_self");
  }
  // wallpaper
  wpHeight = windowHeight;
  wpWidth = wpHeight/wallpaper.height*wallpaper.width;
  image(wallpaper, windowWidth/2, windowHeight/2, wpWidth, wpHeight);
  // Display Image
  let hangmanHeight = windowHeight/2;
  let hangmanWidth = hangmanHeight/hangmans[errors].height * hangmans[errors].width;
  image(hangmans[errors], windowWidth/2, windowHeight*2/5, hangmanWidth, hangmanHeight);
  // resize Div
  let xSizeD = pickedWord.length*windowWidth/25;
  let ySizeD = windowHeight/11;
  div.size(xSizeD, ySizeD);
  div.position(windowWidth/2-xSizeD/2, windowHeight/8-ySizeD/2);
  div.style("font-size", diagonal/30+"px");
  div.style("border", diagonal/200+"px solid black");
  // resize buttons
  for(let i=0; i<alphabet["alphabet"].length; i++) {
    let xSizeB = windowWidth/30;
    let ySizeB = xSizeB;
    buttons[i].size(xSizeB, ySizeB);
    let xPosition;
    let yPosition;
    if (round(i/alphabet["alphabet"].length)==0) {
      xPosition = map(i, -1, floor(alphabet["alphabet"].length/2), windowWidth/6, windowWidth/6*5);
      yPosition = windowHeight/3*2;
    }
    else {
      xPosition = map(i, floor(alphabet["alphabet"].length/2)-1, alphabet["alphabet"].length, windowWidth/6, windowWidth/6*5);
      yPosition = windowHeight/3*2 + windowHeight/10;
    }
    buttons[i].position(xPosition-xSizeB/2, yPosition-ySizeB/2);
    buttons[i].style("font-size", diagonal/60+"px");
    }
}

function check(letter) {
  let found = false;
  for (let i=0; i<pickedWord.length; i++) {
    if(pickedWord[i]==letter) {
      found = true;
      outputText = outputText.slice(0,2*i)+letter+outputText.slice(2*i+1, outputText.length);
      div.html(outputText);
    }
  }
  if (found) {
    // won check
    won = true;
    for (let i=0; i<pickedWord.length; i++) {
      if (pickedWord[i]!=outputText[2*i]) {
        won = false;
      }
    }
  }
  else {
    // errors update
    if(errors<n) {
      errors++;
    }
    // lost check
    if(errors==n) {
      lost = true;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
