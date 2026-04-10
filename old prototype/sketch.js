// Technical global variables
let ml;
let currentLabel = "Waiting...";
let confidence;
let lastClass = "class_3";

// Graphic global variables
let img;
let imgMAN;
let imgWOMAN;
let GOVfont;

async function setup() {
    createCanvas(800, 800);
    img = await loadImage('assets/HM_Government_logo.svg_.png');
    imgMAN = await loadImage('assets/man silhouette.png');
    imgWOMAN = await loadImage('assets/woman silhouette.png');
    GOVfont = await loadFont('assets/RaoulTRANSPORTBritannique.ttf')
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
 background(29,112, 184); 
 fill(255);
 //29,112, 184

//Stop flicker
if (currentLabel != lastClass) {
  if (currentLabel == "class_1") {
    text("Man", 455, 270);
    lastClass = "class_1"
  } else if (currentLabel == "class_2") {
    text("Woman", 455, 270);
    lastClass = "class_2"
  } else {
    lastClass = "class_3"
  }

}

//Confidence Orientation Score

if (confidence <= 70 ) {
    text("Likely Queer", 550, 300);
} else if (confidence > 70 && confidence < 90 ) {
    text("Likely Straight", 550, 300);
} else if (confidence >= 90 ) {
    text("Definitely Straight", 550, 300);
} 


//Visual components of GOV GUI 

//Subject 

noStroke();
rect(30, 220, 350, 550);
if (currentLabel === "class_1") {
  image(imgMAN, 115, 250, (352/2), (980/2)); 
} 
else if (currentLabel === "class_2") {
  image(imgWOMAN, 120, 245, (295/2), (980/2));
}

//Notes
textSize(14);

if (confidence <= 30) {
    text(`Citizen is free to go, 
they do not subject to the act`, 410, 700);
} else if (confidence <= 50) {
    text(`Citizen can be redirected towards the right resources.
For now they leave with a warning`, 410, 700);
} else if (confidence > 70 && confidence < 80) {
    text(`Citizen must be adviced to follow 
the state-approaved relationship guidelines`, 410, 700);
} else if (confidence >= 90) {
    text(`Intervention required. Citizen is to 
comply with the Self-Preservation Act`, 410, 700);
}

noStroke();
fill(200, 50)
rect(400, 570, 370, 200);

// GOV LOGO
fill(10, 82, 145)
rect(30, 30, 770, 50);
image(img, 30, 30, (1280/10), (468/10));

//Written elements
  textFont(GOVfont);
  fill(255);
  textSize(26);
  text('Civic Compatability Engine', 30, 120);

//Results
textSize(18);
text("ID: ", 400, 240);
text("Sex:", 400, 270);
text("Orientation:", 400, 300);
text("Notes:", 410, 600);

// //Change of label's names ---- NOT IN USE!!!
// if (currentLabel === "class_1") {
//     text("Man", 455, 270);
// }
// else if (currentLabel === "class_2") {
//     text("Woman", 455, 270);
// }

}
