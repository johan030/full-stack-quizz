const url = "questions.json";

const Emptytab = []; // Création d'un tableau vide pour mettre mes data dedans

var currentQuestion = 0;

async function getData() {
  // Fonction pour prendre les data de mon fichier JSON
  const responce = await fetch(url);
  const data = await responce.json();

  //console.log(data.questions);
  return data;
}

const copyMyData = async (data) => {
  // Fonction Pour remplir mon Tab vide pour pouvoir l'utiliser partout
  const FillTab = await getData(data);
  Emptytab.push(...FillTab.questions);
  console.log(Emptytab);

  return Emptytab;
};

//constantes
const questionTitle = document.getElementById("questionTitle");
const nextBtn = document.getElementById("btn-1");
const scoreMessage = document.querySelector(".score-message");

let score = 0; // score commence a 0;

//modal
const modal = document.querySelector(".score-modal");
const btnCloseModal = document.querySelector(".close-modal");
const displayModal = document.querySelector(".btn-modal");

function showQuestion() {
  questionTitle.textContent = Emptytab[currentQuestion].question;
  // j'affiche les réponses possibles dans mes boutons
  for (
    let answerIndex = 0;
    answerIndex < Emptytab[currentQuestion].answers.length;
    answerIndex++
  ) {
    window["choice" + answerIndex].textContent =
      Emptytab[currentQuestion].answers[answerIndex];
  }
}

/*function getScore() {
  let scoreStoredInLocalStorage = localStorage.getItem("score");
  if (scoreStoredInLocalStorage != null) {
    // si il y a une valeur dans le localstorage
    h2.textContent = `votre score pour cette partie est de : ${localStorage.getItem(
      "score"
    )}`; // on affiche le score
  }
}
*/

// lorsque l'user selectionne sa réponse
const selectedQuestion = [...document.querySelectorAll(".answer")].forEach(
  (el) =>
    el.addEventListener("click", function (event) {
      console.table({
        indexNumber: event.currentTarget.dataset.indexNumber,
        corectAnswer: Emptytab[currentQuestion].correctIndex,
      });

      if (
        event.currentTarget.dataset.indexNumber ==
        Emptytab[currentQuestion].correctIndex
      ) {
        document.querySelector("body").style.backgroundColor = "#3cb371";

        score++; // on incremente le score a chaque bonne reponse;
        scoreMessage.textContent = score;
      } else {
        document.querySelector("body").style.backgroundColor = "#000";
        score--; // on decremente le score a chaque mauvaise reponse;
        scoreMessage.textContent = score;
      }
    })
);

window.addEventListener("load", async (e) => {
  // je recupere ma question
  await copyMyData();
  // J'affiche la question dans <h2 id="questionTitle"></h2>
  showQuestion();
  // lorsqu'on clique sur le bouton next , la question suivante s'affiche
  nextBtn.addEventListener("click", function () {
    currentQuestion = currentQuestion + 1;
    showQuestion();
  });
});


// je stock les réponses de l'user
function saveHighScore(highScore) {
  localStorage.setItem("highScore", JSON.stringify(highScore));
}

function getHighScore() {
  let highScore = localStorage.getItem("highScore");
  if(highScore == null){
    return [];
  }else{
    return JSON.parse(highScore);
  }
}

function addHighScore(score){
  let highScore = getHighScore();
  highScore.push(score);
  saveHighScore(highScore);
}


//display modal
displayModal.addEventListener("click", function () {
  console.log("clicked");
  modal.classList.remove("hide");
});

//hide modal
btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hide");
});
