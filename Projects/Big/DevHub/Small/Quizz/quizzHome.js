async function getQuestions(){    
    let response = await fetch('./questions.json')
    
    if(!response.ok){
        throw new Error(`Response status:${response.status}`)
    }
    const data = await response.json()     
    localStorage.setItem('questions',JSON.stringify(data))
} 

function startQuizz(){
    getQuestions()
    window.location.href = './quizzQuestion.html'
}
