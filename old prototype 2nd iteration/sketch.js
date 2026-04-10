// Technical global variables
let ml;
let currentLabel = "Waiting...";
let confidence;
let lastClass = "class_3"
let ageSlider;
let intentSlider;
let stabilitySlider;
let contributionScore = 0;
let interventionLevel = "";

// Graphic global variables
let img;
let img2;
let imgMAN;
let imgWOMAN;
let OGL;
let CrownCrest;
let GOVfont;
//let shuffle = ['04579943', '19835436', '09643584', '10203874', '50575572', '97622917', '66969434', '84607079', '79976454', '22916141', '39875464', '21777713' ];

//let choice = random(RandomID);

async function setup() {
    createCanvas(800, 1150);
    img = await loadImage('assets/CROWN.png');
    img2 = await loadImage('assets/CROWN2.png');
    imgMAN = await loadImage('assets/man silhouette.png');
    imgWOMAN = await loadImage('assets/woman silhouette.png');
    OGL = await loadImage('assets/OGL.png');
    CrownCrest = await loadImage('assets/crown-crest-logo.png');
    GOVfont = await loadFont('assets/RaoulTRANSPORTBritannique.ttf');
    console.log;
   

//Taken from Jen's example code:
//Below segment connects P5.js to ML Bridge + Auto-connects to localhost:3100

  ml = new MLBridge();
  
  // Listen for predictions
  ml.onPrediction((data) => {
    console.log(data)
    if (data.label) {
      currentLabel = data.label;
      confidence = int(data.confidence * 100);
    } else if (data.regression) {
      // Handle Regression
      currentLabel = "";
      for (let key in data.regression) {
        currentLabel += nf(data.regression[key], 1, 2) + "\n";
      }
    }
  });

}

function draw() {
 background(255); //29, 112, 184

//Confidence Orientation Score

push();
fill(0);
noStroke(0);
textSize(15);
if (currentLabel != "class_3") {
  if (confidence <= 70) {
    textWeight(300);
    text("Likely Homosexual", 550, 300);
  } else if (confidence > 70 && confidence < 90) {
    textWeight(300);
    text("Likely Heterosexual", 550, 300);
  } else if (confidence >= 90) {
    textWeight(300);
    text(`Definitely Heterosexual`, 550, 300);
}}else {}
pop();

//Visual components of GOV GUI 

//Subject 
noStroke();
fill(142, 184, 220);
rect(30, 220, 350, 550);
if (currentLabel === "class_1") {
  image(imgMAN, 115, 250, (352/2), (980/2)); 
} 
else if (currentLabel === "class_2") {
  image(imgWOMAN, 120, 245, (295/2), (980/2));
}

push();
noStroke();
fill(142, 184, 220)
rect(400, 650, 370, 120);

// GOV LOGO
push();
fill(29, 112, 184);
rect(0, 20, 900, 623/10);
image(img, 15, 15, (623/9), (623/9));
pop();

//Annoying banner details
fill(255);
rect(0, 10, 100, 10);
rect(0, 82.25, 100, 10);

fill(0, 255, 225);
circle(170, 52, 8, 8);

//Written elements
push();
fill(244, 248, 251);
textWeight(100);
textSize(17.5);
text('Civic Compitability Model', 242, 64);
pop();

push();
textFont(GOVfont);
  fill(255);
  textWeight(900);
  textSize(26);
  text('GOV UK', 80, 64);


//Results
push();
fill(0);
textSize(18);
text("ID: ", 400, 240);
text("Sex:", 400, 270);
text("Orientation:", 400, 300);
text("Notes:", 410, 680);
pop();



//Change of label's names
if (currentLabel === "class_1") {
    textSize(16);
    textWeight(300);
    text("Man", 455, 270);
    
}
else if (currentLabel === "class_2") {
    textSize(16);
    textWeight(300);
    text("Woman", 455, 270);
    
}

//Graphs 
push()
fill(142, 184, 220);
noStroke();
rect(620, 400, 150, 150);

strokeWeight(2);

if (currentLabel != "class_3") {
    if(confidence >= 90) {
      stroke(0, 100, 0);
      fill(0, 100, 0);
        line(620, 550, 670, 500);
        line(670, 500, 695, 525);
        line(695, 525, 745, 450);
        triangle(745, 450, 735, 455, 745, 462);
}
    else {
      stroke(100, 0, 0);
      fill(100, 0, 0);
        line(670, 500, 620, 450);
        line(670, 500, 695, 475);
        line(695, 475, 745, 525);
        triangle(745, 525, 732, 520, 740, 512);
} }else {}
pop()

//Notes
push();
textSize(12);

if (confidence <= 30) {
    fill(0);
    textWeight(100);
    text(`Citizen is free to go, 
they do not subject to the act`, 410, 700);
} else if (confidence <= 50) {
    fill(0);
    textWeight(100);
    text(`Citizen can be redirected towards the 
right resources. For now they leave 
with a warning`, 410, 700);
} else if (confidence > 70 && confidence < 80) {
    fill(0);
    textWeight(100);
    text(`Citizen must be adviced to follow 
the state-approaved relationship guidelines`, 410, 700);
} else if (confidence >= 90) {
    fill(0);
    textWeight(100);
    text(`Intervention required. Citizen is to 
comply with the Self-Preservation Act`, 410, 700);
pop();
}

// //Nav Bar
// fill(230, 240, 247);
// rect(0, 20 + 623/10, 900, 47);

// fill(29, 112, 184);
// rect(304, 125, 50, 5);

// push();
// textFont(GOVfont);
// fill(0);
// textWeight(900);
// textSize(18);
// text('Citizen Intake Panel', 30, 200);
// pop();

// push();
// strokeWeight(1);
// stroke(29, 112, 184);
// line(0, 130, 800, 130);
// pop();

// push();
// fill(29, 112, 184);
// textSize(15)
// textWeight(50);
// text("Get Started", 30, 115);
// text("Calibrate", 180, 115);
// text("Scan", 304, 115);
// text("Process", 382, 115);
// text("Log", 488, 115);
// pop();

//Lower area
// fill(230, 240, 247);
// rect(0, 825, 825, 1100);

// push();
// fill(0);
// textWeight(100);
// textSize(14);
// text('Ⓒ Crown copyright', 598, 1105);
// fill(29, 112, 184);
// rect(0, 825, 800, 10);
// stroke(2);
// line(598, 1109, 774, 1109);
// image(img2, 12, 855, 623/8, 623/8)
// image(CrownCrest, 630, 970, 833/7, 833/7);
// pop();

// push();
// textWeight(100);
// textSize(14);
// fill(0);
// text(`Help`, 30, 950);
// text(`Privacy`, 90, 950 );
// text(`Cookies`, 170, 950);
// text(`Contact`, 256, 950);
// text(`Accessibility statement`, 30, 980);
// text(`Terms and conditions`, 262, 980);
// text(`Government Digital Service`, 30, 1010);
// pop();

// push();
// fill(0);
// stroke(1);
// line(32, 954, 74, 954);
// //Privacy
// line(92, 954, 156, 954);
// //Cookies
// line(172, 954, 244, 954);
// //Contact
// line(258, 954, 330, 954);
// //Access. State.
// line(30, 984, 248, 984);
// //T&Cs
// line(262, 984, 460, 984);
// //GDS
// line(30, 1014, 288, 1014);
// pop();

// push();
// image(OGL, 30, 1035, 354/8, 142/8)
// textWeight(100);
// textSize(14);
// fill(0);
// text(`All content is available under the Open Government`, 30, 1080);
// text(`Licence v7.5, except where otherwise stated`, 30, 1105);
// fill(0);
// stroke(1)
// line(352, 1084, 518, 1084);
// line(32, 1110, 144, 1110);
// pop();

// //EXTRA DATA??? doesnt work AAAAAAAAAAAAAAAAA
// push();
//   ageSlider = createSlider(18, 50, 30);
//   ageSlider.position(418, 350);

//   intentSlider = createSlider(0, 100, 50);
//   intentSlider.position(418, 390);

//   stabilitySlider = createSlider(0, 100, 50);
//   stabilitySlider.position(418, 420);

//   fill(0);
//   textFont(GOVfont);
//   textSize(15);
//   text("Age", 410, 350);
//   text(ageSlider.value(), 480, 350);

//   text("Reproductive Intent", 410, 390);
//   text(intentSlider.value() + "%", 680, 390);

//   text("Relationship Stability Index", 410, 420);
//   text(stabilitySlider.value() + "%", 680, 420);
// pop();

// fill(0);
// textSize(36);
// text("Hello world", 30, 100);

}


