Projects = [
    {
        Id : 0,
        name : 'ColorPaletteGen',
        description : "Color Palette Generator",
        url:'./small/ColorPaletteGen/Home.html'
    },
    {
        Id : 1,
        name : 'DragAndDropAPI',
        description : "Kanban Board using drag and drop api",
        url:'./small/DragAndDropAPI/Home.html'
    },
    {
        Id : 2,
        name : 'ExpenseTracker',
        description : "Expence Tracker",
        url:'./small/ExpenseTracker/Home.html'
    },
    {
        Id : 3,
        name : 'Quiz App',
        description : "Quiz app",
        url:'./small/Quizz/quizzHome.html'
    }
]

mainPage = document.getElementById('main')
iframePage = document.getElementById('viewer-section') 

function renderProject(element){
    projectId = element.id;
    console.log(projectId)
    document.getElementById('iframe').src = Projects[projectId].url
    mainPage.style.display = 'none'
    iframePage.style.display = 'block'
}