let questions;
let questionCount = 0
const questionCountStatus = document.getElementById('questionNumber')
const questionAndOptions = document.getElementById('queandoptions')
let rightAnswer  = ''

document.addEventListener('DOMContentLoaded',()=>{
    questions = JSON.parse(localStorage.getItem('questions'));
    console.log(questions)
    if (!questions) {
        window.location.href = './index.html';
        return;
    }
    startQuizz()
})


function startQuizz(){
    if(questionCount < questions.quiz.length){
        showQuestion(questionCount)
    }
}

function showQuestion(i){

    console.log(questions)
    const question = document.getElementById('question')
    questionAndOptions.classList.remove("disabled-div");

    question.innerText = questions.quiz[i].question
        
    for(let j = 0; j <= questions.quiz[i].options.length; j++){
        const option = document.getElementById(`option${j}`)
        
        let answer = questions.quiz[i].answer
        if (questions.quiz[i].options[j] === answer){
            rightAnswer = ''
            rightAnswer = document.getElementById(`option${j}`)
        }

        option.innerText = questions.quiz[i].options[j]
    }
}

function optionSelected(element){
    questionAndOptions.classList.add("disabled-div");
    console.log(element.textContent)
    if ( element.textContent === questions.quiz[questionCount].answer ){
        console.log('Right Answer')
        document.getElementById(element.id).style.borderColor = 'Green'
        document.getElementById(element.id).style.borderWidth = '4px'

    }
    else {
        console.log('wrong answer')
        rightAnswer.style.borderColor = 'Green'
        rightAnswer.style.borderWidth = '4px'
        document.getElementById(element.id).style.borderColor = 'Red'
        document.getElementById(element.id).style.borderWidth = '4px'
    }
    
    setTimeout(()=>{
        rightAnswer.style.borderColor = ''
        rightAnswer.style.borderWidth = ''
        document.getElementById(element.id).style.borderColor = ''
        document.getElementById(element.id).style.borderWidth = ''
        if (questionCount < questions.quiz.length-1){
            questionCount += 1 
            showQuestion(questionCount);
        }
        else{
            window.location.href = './quizzHome.html'
        }
    },1500)
}