// variables
const buttons = document.querySelectorAll(".buttons-container button");
const gridSizeOption = document.querySelector("#grid-size");
const colorRadioButtons = document.querySelectorAll("input[type='radio']");
const modal = document.querySelector(".modal");
const grid = document.querySelector(".boxes-container");
let brush = "black";
let gridSize = 16;
let numberOfBoxes;

// functions ================================
const getGridSize = (value) => {
  if (value === "sixteen") return 16;

  if (value === "thirty-two") return 32;

  if (value === "forty") return 40;
};

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
  grid.innerHTML = "";
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

const handleEraseButton = (e) => {
  if (e.target.id === "erase" && !e.target.classList.contains("active")) {
    brush = "white";
    e.target.classList.add("active");
  } else if (e.target.id === "erase" && e.target.classList.contains("active")) {
    brush = "black";
    e.target.classList.remove("active");
  }
};

const clearGrid = (e) => {
  if (e.target.id === "clear") {
    displayGrid(gridSize, numberOfBoxes);
  }
};

// events ============================
gridSizeOption.addEventListener("input", (e) => {
  gridSize = getGridSize(e.target.value);
  numberOfBoxes = getNumberOfBoxes(gridSize);
  displayGrid(gridSize, numberOfBoxes);
});

colorRadioButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    brush = e.target.value;
  });
});

grid.addEventListener("mouseover", (e) => {
  if (brush === "random") {
    e.target.style.backgroundColor = randomColor();
  } else {
    e.target.style.backgroundColor = brush;
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleEraseButton(e);
    clearGrid(e);
  });
});

// alert user that etch a sketch is not responsive please resize
window.addEventListener("resize", (e) => {
  if (window.innerWidth <= 700) {
    modal.classList.remove("hide");
  }
  if (window.innerWidth > 701) {
    modal.classList.add("hide");
  }
});

// display grid at first
numberOfBoxes = getNumberOfBoxes(gridSize);
displayGrid(gridSize, numberOfBoxes);

// send a message when screen size is below 600px
