let count = 0;

const value = document.querySelector("#value");

const btns = document.querySelectorAll(".btn");
// console.log(btn);
// console.log(value);

btns.forEach(function (btn) {
  console.log(typeof btn);
  btn.addEventListener("click", function (e) {
    const style = e.currentTarget.classList;

    console.log(style);

    if (style.contains("increase")) {
      count++;
    } else if (style.contains("decrease")) {

        console.log('co');
      count--;
    } else {
      count = 0;
    }

    //  set color

    if (count > 0) {
      value.style.color = "blue";
    } else if (count < 0) {
      value.style.color = "red";
    } else {
      value.style.color = "black";
    }

    value.textContent = count;
  });
});
