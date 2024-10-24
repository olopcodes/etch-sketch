// variables
const buttons = document.querySelectorAll(".buttons-container button");
const gridSizeOption = document.querySelector("#grid-size");
const colorRadioButtons = document.querySelectorAll("input[type='radio']");
const grid = document.querySelector(".boxes-container");
let brush = "black";
let gridSize = 16;

// functions ================================
const getGridSize = (value) => {
  if (value === "sixteen") return 16;

  if (value === "thirty-two") return 32;

  if (value === "sixty-four") return 64;
};

const getBrushColor = (value) => (value === "black" ? "black" : "random");

const getNumberOfBoxes = (value) => value * value;

const getBoxDimensions = (gridSize) => {
  console.log(grid.clientWidth / gridSize, grid.clientHeight / gridSize);

  console.log(grid.offsetWidth);

  return {
    boxWidth: window.innerWidth / gridSize,
    boxHeight: window.innerHeight / gridSize,
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

// events ============================
gridSizeOption.addEventListener("input", (e) => {
  grid.innerHTML = "";
  gridSize = getGridSize(e.target.value);
  const numberOfBoxes = getNumberOfBoxes(gridSize);
  displayGrid(gridSize, numberOfBoxes);
});

colorRadioButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    brush = getBrushColor(e.target.value);
  });
});

grid.addEventListener("mouseover", (e) => {
  //   alert("hey");
});

// send a message when screen size is below 600px
