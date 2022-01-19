const afficheQuestion = document.getElementById("question");
const btn1 = document.getElementById('btn-1');
let questionsData = [];

const fetchQuestions = () => {
    // RECUPERATION DU FICHIER JSON
fetch("quiz.json")
.then((res) => res.json())
.then((data) => (questionsData = data.questions));

setTimeout(() =>{                      // on attend 2s avant d'afficher console.log         
    console.log(questionsData);
},2000)

};


// On crée une fonction pour afficher les questions

const questionsDisplay = async () => { 
   await fetchQuestions();



}
questionsDisplay();




//lorsqu'on clique sur le bouton suivant, on passe à la prochaine question
btn1.addEventListener('click', () => {
questionsDisplay();
})


