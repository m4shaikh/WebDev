let questions;

document.addEventListener('DOMContentLoaded',()=>{
    questions = JSON.parse(localStorage.getItem('questions'));
    console.log(questions)
    if (!questions) {
        window.location.href = './index.html';
        return;
    }
    showQuestion()
})

function showQuestion(i){
    
    console.log(questions)
    const question = document.getElementById('question')

    
        question.innerText = questions.quiz[i].question
        
        for(let j = 0; j <= 3; j++){
            const option = document.getElementById(`option${j}`)
            option.innerText = questions.quiz[i].options[j]
        }

}

function showQuestion(){
    
    console.log(questions)
    const question = document.getElementById('question')

    question.innerText = questions.quiz[i].question
        
    for(let j = 0; j <= 3; j++){
        const option = document.getElementById(`option${j}`)
        option.innerText = questions.quiz[i].options[j]
    }
        
    
}
function optionSelected(){

}