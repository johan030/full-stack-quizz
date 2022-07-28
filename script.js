const url = "questions.json";
console.log(url);
var Emptytab = []; // Création d'un tableau vide pour mettre mes data dedans

async function getData() {
  // Fonction pour prendre les data de mon fichier JSON
  const responce = await fetch(url);
  const data = await responce.json();

  console.log(data);
  return data;
}

const copyMyData = async (data) => {
  // Fonction Pour remplir mon Tab vide pour pouvoir l'utiliser partout
  const FillTab = await getData(data);
  Emptytab.push(...FillTab);

  return Emptytab;
};
getData();

// on selectionne nos id qui correspondent à chaque choix ainsi que la question
const questionTitle = document.getElementById("questionTitle");
const choice0 = document.getElementById("choice0");
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");

let currentQuestion = 0; // on commence le quiz à 0 ( question 1 )

loadQuiz();

function loadQuiz() {


  currentQuestion++; // on passe à la question suivante
}
