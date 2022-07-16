const bg = document.getElementById("bg");
const moon = document.getElementById("moon");
const mountain = document.getElementById("mountain");
const road = document.getElementById("road");
const text = document.getElementById("text");


console.log("gia tri: "+ bg.style.top+"px");
window.addEventListener("scroll", () => {
  bg.style.top = scrollY*0.5+ "px";
  console.log(scrollY);
  mountain.style.top = -scrollY*0.15 +'px';
  moon.style.left = -scrollY*0.5 + 'px';
  road.style.top = scrollY *0.15 + 'px';
  text.style.top = scrollY + 'px';
});
