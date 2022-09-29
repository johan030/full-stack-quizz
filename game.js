//constantes
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("answer"));
const scoreText = document.getElementById("score");
const SCORE_TO_GET = 5; // 5 points par bonne réponse
const MAX_QUESTIONS = 6; // le nombre de questions max
const highScoreList = document.getElementById("highScoreList"); // liste des scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const MAX_HIGH_SCORES = 5; // nb de scores max à afficher



//variables
let currentQuestion = {}; // la question affichée
let acceptingAnswers = false;
let score = 0; // on commence le score à 0
let questionCounter = 0; //on commence par la 1ere question
let availableQuestions = []; // questions disponibles

let questions = [];
fetch("questions.json")
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  });

// on commence le quiz

startGame = () => {
  questionCounter = 0; // on commence à 0
  score = 0; //idem pour le score
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

// nouvelle question
getNewQuestion = () => {
  if (availableQuestions.length == 0) {
    // s'il n'y a plus de questions on charge le score dans le local storage
    localStorage.setItem("mostRecentScore", score);
  }
  questionCounter++; // on passe à la question suivante

  const questionIndex = Math.floor(Math.random() * availableQuestions.length); // on randomise les questions
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question; // on affiche la question
  console.log(currentQuestion);

  //on affiche les réponses
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  // lorsque l'user clique sur une réponse
  choice.addEventListener("click", e => {
    //on enregistre son choix
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // pk ma condition fonctionne pas?
    //const isCorrectAnswer = 'incorrect';
    //if(selectedAnswer == currentQuestion.answer){
    //  isCorrectAnswer = 'correct';
    //}

    // si la réponse est = a la réponse selectionnée par l'user
    const isCorrectAnswer =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
// si la rep est correct alors j'incrémente le score.
    if (isCorrectAnswer == "correct") {
      incrementScore(SCORE_TO_GET);
    }
    selectedChoice.parentElement.classList.add(isCorrectAnswer);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(isCorrectAnswer);
      getNewQuestion();
    }, 1000);
  });
});


// fonction qui incrémente le score
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
}


// on map la liste des scores highScores et on ajoute un <li> en l'affichant
highScoreList.innerHTML = highScores.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`; 
}).join("");

finalScore.innerText = mostRecentScore;

// highscore

// je veux que l'user ne puisse pas save son score s'il n'entre pas son nom
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


// on sauvegare le score et on l'affiche
saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5); // on arrête à 5 users

    // on save
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
};