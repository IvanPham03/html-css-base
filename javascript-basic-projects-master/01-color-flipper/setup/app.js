const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const button = document.getElementById("btn");

const color = document.querySelector('.color');
console.log(color);
button.addEventListener("click", function () {
  const random = getRandomNumber();
  document.body.style.backgroundColor = colors[random];
  color.textContent = colors[random];
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
