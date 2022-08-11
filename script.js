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

const questionTitle = document.getElementById("questionTitle");
const nextBtn = document.getElementById("btn-1");
const saveScoreBtn = document.getElementById('saveScoreBtn'); 
const MAXHIGHSCORES = 5; // le maximums de score à afficher


function showQuestion() {
  questionTitle.textContent = Emptytab[currentQuestion].question;
  // j'affiche les réponses possibles dans mes boutons
  for(let answerIndex = 0; answerIndex < Emptytab[currentQuestion].answers.length; answerIndex++) {
    window['choice'+answerIndex].textContent = Emptytab[currentQuestion].answers[answerIndex];
  }
}


function getScore(){
  let scoreStoredInLocalStorage = localStorage.getItem("score");
  if( scoreStoredInLocalStorage != null){  // si il y a une valeur dans le localstorage
    h2.textContent = `votre score pour cette partie est de : ${localStorage.getItem("score")}`; // on affiche le score
  }
}

  // lorsque l'user selectionne sa réponse
const selectedQuestion = [...document.querySelectorAll('.answer')].forEach(el => el.addEventListener('click', function(event){
  console.table({
    'indexNumber' : event.currentTarget.dataset.indexNumber,
    'corectAnswer': Emptytab[currentQuestion].correctIndex
  })

  if(event.currentTarget.dataset.indexNumber == Emptytab[currentQuestion].correctIndex){
    document.querySelector("body").style.backgroundColor = "#3cb371";
  }else{
    document.querySelector("body").style.backgroundColor = "#000";
  }
  localStorage.setItem("score", JSON.stringify(score.value));
 getScore();
}))




window.addEventListener("load", async (e) => {
  // je recupere ma question
  await copyMyData();
  // J'affiche la question dans <h2 id="questionTitle"></h2>
  showQuestion();
  // lorsqu'on clique sur le bouton next , la question suivante s'affiche
  nextBtn.addEventListener('click', function() {
    currentQuestion = currentQuestion + 1;
    showQuestion();
  })


  // je sauvegarde les réponses de l'user

  // je stock les réponses de l'user
localStorage.setItem('score', JSON.stringify([]) );
console.log(localStorage.getItem('score'));



  // lorque l'user à répondu à la totalité des questions le score s'affiche.
});
