// variables
const buttons = document.querySelectorAll(".buttons-container button");
const gridSizeOption = document.querySelector("#grid-size");
const colorRadioButtons = document.querySelectorAll("input[type='radio']");
const grid = document.querySelector(".boxes-container");
let brush = "black";
let gridSize = 16;
let numberOfBoxes;
let erase = false;

// functions ================================
const getGridSize = (value) => {
  if (value === "sixteen") return 16;

  if (value === "thirty-two") return 32;

  if (value === "forty") return 40;
};

const getBrushColor = (value) => (value === "black" ? "black" : "random");

const getNumberOfBoxes = (value) => value * value;

const getBoxDimensions = (gridSize) => {
  return {
    boxWidth: grid.clientWidth / gridSize,
    boxHeight: grid.clientHeight / gridSize,
  };
};

const createBox = (size) => {
  const boxDimensions = getBoxDimensions(size);
  const box = document.createElement("div");
  box.classList.add("box");
  box.style.width = boxDimensions.boxWidth + "px";
  box.style.height = boxDimensions.boxHeight + "px";
  return box;
};

const displayGrid = (size, value) => {
  while (value > 0) {
    const box = createBox(size);
    grid.appendChild(box);
    value--;
  }
};

const randomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

// events ============================
gridSizeOption.addEventListener("input", (e) => {
  grid.innerHTML = "";
  gridSize = getGridSize(e.target.value);
  numberOfBoxes = getNumberOfBoxes(gridSize);
  displayGrid(gridSize, numberOfBoxes);
});

colorRadioButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    brush = getBrushColor(e.target.value);
  });
});

grid.addEventListener("mouseover", (e) => {
  brush = "random";
  if (brush === "black" && !erase) {
    e.target.style.backgroundColor = "black";
  } else if (brush === "random" && !erase) {
    e.target.style.backgroundColor = randomColor();
  }
});

// alert user that etch a sketch is not responsive please resize
window.addEventListener("resize", (e) => {
  console.log("resize");
  if (window.innerWidth === 700) {
    console.log("stop");
  }
});

// display grid at first
numberOfBoxes = getNumberOfBoxes(gridSize);
displayGrid(gridSize, numberOfBoxes);

// send a message when screen size is below 600px
