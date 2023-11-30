//selecting elements
const startBttn = document.querySelector('button[data-start]');
const stopBttn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const colorValue=document.querySelector('span')
let intervalId = null;
stopBttn.disabled = true;
// start button function with interval 
startBttn.addEventListener("click", () => { 
  startBttn.disabled = true;
  stopBttn.disabled = false;

 intervalId= setInterval(() => {
   const newColor = getRandomHexColor();
  body.style.backgroundColor = newColor;
  colorValue.textContent = newColor;
  },1500)
})
//stop button function with clearing the interval
stopBttn.addEventListener("click", () => {
startBttn.disabled = false;
  stopBttn.disabled = true;
  clearInterval(intervalId);
});
// function which gives random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
