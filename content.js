let body = document.querySelector("body");

let outerDiv = document.createElement("div");
outerDiv.classList.add("outer");

let textbox = document.createElement("textarea");
textbox.classList.add("txtbox");
textbox.setAttribute("id", "printArea");
textbox.setAttribute("placeholder", "Start making notes....");

// let bigDiv = document.createElement("div");
// bigDiv.classList.add("bigDiv");

let btnDiv = document.createElement("div");
btnDiv.setAttribute("id", "btnDiv");

let btn = document.createElement("btn");
btn.setAttribute("id", "btn");
btn.innerHTML = "Expand";

let pdfbtn = document.createElement("button");
pdfbtn.setAttribute("id", "pdfbtn");
pdfbtn.innerHTML = "Download";

btn.addEventListener("click", expandCollapse);
outerDiv.classList.add("reduce");
// bigDiv.classList.add("reduce");
textbox.classList.add("zero");

let initial = false;
function expandCollapse() {
  if (initial === true) {
    outerDiv.classList.add("reduce");
    // bigDiv.classList.add("reduce");
    textbox.classList.add("zero");
    btn.innerHTML = "Expand";
    initial = false;
  } else {
    outerDiv.classList.remove("reduce");
    // bigDiv.classList.remove("reduce");
    textbox.classList.remove("zero");
    btn.innerHTML = "Shrink";
    initial = true;
  }
}

btnDiv.appendChild(btn);
btnDiv.appendChild(pdfbtn);
// bigDiv.appendChild(textbox);
// outerDiv.appendChild(bigDiv);
outerDiv.appendChild(textbox);
outerDiv.append(btnDiv);
body.appendChild(outerDiv);

/*free moves */
var mousePosition;
var offset = [0, 0];
var div;
var isDown = false;

document.body.appendChild(outerDiv);

outerDiv.addEventListener(
  "mousedown",
  function (e) {
    isDown = true;
    offset = [outerDiv.offsetLeft - e.clientX, outerDiv.offsetTop - e.clientY];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDown = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      outerDiv.style.left = mousePosition.x + offset[0] + "px";
      outerDiv.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);

pdfbtn.addEventListener("click", downloadIT);

// content.js

// Create a script element
let script1 = document.createElement("script");
let script2 = document.createElement("script");

// Set the script source to the local copy of jsPDF

script1.setAttribute("src", chrome.runtime.getURL("makePDF/pdfMake.min.js"));
script2.setAttribute("src", chrome.runtime.getURL("makePDF/vfs_fonts.js"));

// Append the script element to the document
document.head.appendChild(script1);
document.head.appendChild(script2);

// Wait for the script to load

function downloadIT() {
  let textVal = document.getElementById("printArea").value;

  var docdef = {
    content: [`${textVal}`],
  };
  pdfMake.createPdf(docdef).download();
}
