//using selectors inside the element
// traversing the dom

const questions = document.querySelectorAll(".question");

questions.forEach(function (question) {
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", function () {
    questions.forEach(function (item) {
      if (item !== question) {

        // vong lap nay that ra la lay so sanh voi group class ban dau, khi minh chon cai khac thi se dong lai
        //  vi du nhu click chon so 1, sau do click chon cai khac so 1 thi cai so 1 se dong lai
    
        item.classList.remove("show-text");
      }
    });
    question.classList.toggle("show-text");
  });
});
