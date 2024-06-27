const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearCanvasBtn = document.querySelector(".clear-canvas");
const saveImageBtn = document.querySelector(".save-img");
const ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY, isDrawing = false;
let selectedTool = "brush";
let brushWidth = 5;
let selectedColor = "#E57373"; // Default starting color

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Function to set canvas background
const setCanvasBackground = () => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
};

// Initial setup on window load
window.addEventListener("load", () => {
    setCanvasBackground();
});

// Tool buttons event listeners
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

// Size slider event listener
sizeSlider.addEventListener("input", () => {
    brushWidth = sizeSlider.value;
});

// Color buttons event listeners
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".colors .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = btn.style.backgroundColor;
    });
});

// Color picker event listener
colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
    // Update the selected color preview
    document.querySelector(".colors .selected").style.backgroundColor = selectedColor;
});

// Clear canvas button event listener
clearCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
});

// Save image button event listener
saveImageBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `drawing_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
});

// Mouse event listeners for drawing
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        switch (selectedTool) {
            case "pencil":
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                break;
            case "brush":
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                break;
            case "eraser":
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.strokeStyle = "#ffffff"; // Eraser color is white
                ctx.stroke();
                break;
            case "rectangle":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setCanvasBackground();
                drawRectangle(e);
                break;
            case "circle":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setCanvasBackground();
                drawCircle(e);
                break;
            case "triangle":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setCanvasBackground();
                drawTriangle(e);
                break;
            case "line":
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setCanvasBackground();
                drawLine(e);
                break;
            default:
                break;
        }
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();
});

canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
    ctx.closePath();
});

// Function to draw a rectangle
const drawRectangle = (e) => {
    const width = e.offsetX - prevMouseX;
    const height = e.offsetY - prevMouseY;
    ctx.fillRect(prevMouseX, prevMouseY, width, height);
};

// Function to draw a circle
const drawCircle = (e) => {
    const radius = Math.sqrt(Math.pow(e.offsetX - prevMouseX, 2) + Math.pow(e.offsetY - prevMouseY, 2));
    ctx.beginPath();
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    ctx.fill();
};

// Function to draw a triangle
const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.fill();
};

// Function to draw a line
const drawLine = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};
