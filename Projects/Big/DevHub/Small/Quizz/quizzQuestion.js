let questions;
let questionCount = 0
const questionCountStatus = document.getElementById('questionNumber')
const cardContent = document.getElementById('content')
let rightAnswer  = ''
let score = 0

document.addEventListener('DOMContentLoaded',()=>{
    questions = JSON.parse(localStorage.getItem('questions'));
    console.log(questions)
    if (!questions) {
        window.location.href = './quizzHome.html';
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
    cardContent.classList.remove("disabled-div");
    questionCountStatus.innerText = `Question ${i+1} / ${questions.quiz.length}`
    question.innerText = questions.quiz[i].question
        
    for(let j = 0; j < questions.quiz[i].options.length; j++){
        const option = document.getElementById(`option${j}`)
        
        let answer = questions.quiz[i].answer
        if (questions.quiz[i].options[j] === answer){
            rightAnswer = document.getElementById(`option${j}`)
        }
        if(option){
            option.innerText = questions.quiz[i].options[j]
        }
    }
}

function optionSelected(element){
    cardContent.classList.add("disabled-div");
    console.log(element.textContent)
    if ( element.textContent === questions.quiz[questionCount].answer ){
        console.log('Right Answer')
        score += 1
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
            showResult()
        }
    },1500)
}


function showResult(){
   
    
    switch(true){
        case(score < (1/2*(questions.quiz.length))):{
            document.getElementById('content').innerHTML = `<h2>Quiz Results!</h2>
                <div id="highlight">
                    <h3>You can do better!</h3>
                    <p>You scored : ${score} out of ${questions.quiz.length}
                </div>`

            break;
        }
        case(score < (3/5*(questions.quiz.length))):{
            document.getElementById('content').innerHTML = `<h2>Quiz Results!</h2>
                <div id="highlight">
                    <h3>You did good</h3>
                    <p>You scored : ${score} out of ${questions.quiz.length}
                </div>`

            break;
        }
        case(score < (4/5*(questions.quiz.length))):{
            document.getElementById('content').innerHTML = `<h2>Quiz Results!</h2>
                <div id="highlight">
                    <h3>You did great</h3>
                    <p>You scored : ${score} out of ${questions.quiz.length}
                </div>`

            break;
        }
        case(score === questions.quiz.length):{
            document.getElementById('content').innerHTML = `<h2>Quiz Results!</h2>
                <div id="highlight">
                    <h3>Are you a genius</h3>
                    <p>You scored : ${score} out of ${questions.quiz.length}
                </div>`

            break;
        }
        
    }      

}