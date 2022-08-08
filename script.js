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

// on selectionne nos id qui correspondent à chaque choix ainsi que la question
const questionTitle = document.getElementById("questionTitle");
const choice0 = document.getElementById("choice0");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");
const nextBtn = document.getElementById("btn-1");



function selectNextQuestion() {
  // quand l'user clique sur le bouton suivant
}

function getScore() {
  //  qui stock le score de l'user
}

function showQuestion() {
  questionTitle.textContent = Emptytab[currentQuestion].question;

  // j'affiche les réponses possibles dans mes boutons
  for(let answerIndex = 0; answerIndex < Emptytab[currentQuestion].answers.length; answerIndex++) {
    window['choice'+answerIndex].textContent = Emptytab[currentQuestion].answers[answerIndex];

  }
}

window.addEventListener("load", async (e) => {
  // je recupere ma question
 
  await copyMyData();

  // J'affiche la question dans <h2 id="questionTitle"></h2>
  showQuestion();

  // lorsque l'user selectionne sa réponse
  function selectAnswer() {
    // lorsque l'user selectionne la bonne réponse le boutton et le body passent en vert
    if (correctIndex == true) {
      document.querySelector("body").style.backgroundColor = "#3cb371";
    } else {
      // lorsque l'user selectionne la mauvaise réponse le boutton et le body passent au rouge.
      document.querySelector("body").style.backgroundColor = "#ff0000";
    }
  }

  // lorsqu'on clique sur le bouton next , la question suivante s'affiche
  nextBtn.addEventListener('click', function() {
    currentQuestion = currentQuestion + 1;
    showQuestion();
  })

  // je stock les réponses de l'user

  // lorque l'user à répondu à la totalité des questions le score s'affiche.
});
