Projects = [
    {
        Id : 0,
        name : 'ColorPaletteGen',
        description : "Color Palette Generator",
        url:'./small/ColorPaletteGen/Home.html',
        darkImage : './images/CPG-image.png',
        lightImage : './images/CPG-light-image.png'
    },
    {
        Id : 1,
        name : 'DragAndDropAPI',
        description : "Kanban Board using drag and drop api",
        url:'./small/DragAndDropAPI/Home.html',
        darkImage : './images/KB-image.png',
        lightImage : './images/KB-light-image.png'
    },
    {
        Id : 2,
        name : 'ExpenseTracker',
        description : "Expence Tracker",
        url:'./small/ExpenseTracker/Home.html',
        darkImage : './images/ET-image.png',
        lightImage : './images/ET-light-image.png'
    },
    {
        Id : 3,
        name : 'Quiz App',
        description : "Quiz app",
        url:'./small/Quizz/quizzHome.html',
        darkImage : './images/Q-image.png',
        lightImage : './images/Q-light-image.png'
    }
]

Skills = [
    {
        title : 'Frontend',
        list : ['HTML','CSS','JavaScript']
    },
    {
        title : 'Backend',
        list : ['Django','Node','SQL']
    },
    {
        title : 'Programming',
        list : ['Python','JavaScript','C++']
    }
]

//script

const mainPage = document.getElementById('main')
const iframePage = document.getElementById('viewer-section') 
const iframe = document.getElementById('iframe') 
const skillTags = document.getElementById('tags')

const buttonCircle = document.getElementById('inside-circle')
const body = document.body
const projectLibrary = document.getElementById('project-library')

let isCurrentThemeDark 


window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        isCurrentThemeDark = true;
        body.classList.add('dark');
        buttonCircle.classList.add('on');
    } else {
        isCurrentThemeDark = false;
    }
    renderSkillTags();
    renderProjectCards(); 
});


function renderSkillTags(){
    skillTags.innerHTML = ''
    Skills.forEach(Category => {
        const skillCategory = document.createElement('div')
        skillCategory.id = 'tag-category'

        const categoryTitle = document.createElement('div')
        categoryTitle.className = 'category-title'
        categoryTitle.textContent = `${Category.title}`

        skillCategory.appendChild(categoryTitle)

        const skillsContainer = document.createElement('div')
        skillsContainer.className = 'skills-container'
        Category.list.forEach(skill => {
            const skillCard = document.createElement('skill-card')
            skillCard.className = 'skill-card'
            skillCard.textContent = `${skill}`
            skillsContainer.appendChild(skillCard)
        })

        skillCategory.appendChild(skillsContainer)
        skillTags.appendChild(skillCategory)
    })
}


function renderProjectCards(){
    Projects.forEach(Project => {
        const projectCard = document.createElement('div')
        projectCard.classList.add('project')
        projectCard.id = Project.Id
        projectCard.onclick = () => renderProject(projectCard);
        if(isCurrentThemeDark){
            projectCard.innerHTML = `<div class="project-image"><img src="${Project.darkImage}" alt="image" ></div>`
        }else{
            projectCard.innerHTML = `<div class="project-image"><img src="${Project.lightImage}" alt="image"> </div>`
        }
        projectLibrary.appendChild(projectCard)
    });
} 



function renderProject(element){
    let projectId = element.id;
    iframe.src = Projects[projectId].url

    mainPage.style.display = 'none'
    iframePage.style.display = 'block'
}


function toggle() {
    
    isCurrentThemeDark = !isCurrentThemeDark

    body.classList.toggle('dark');
    buttonCircle.classList.toggle('on');

    projectLibrary.innerHTML = ''; 
    renderProjectCards();  
}


function backButton(){
    mainPage.style.display = 'block'
    iframePage.style.display = 'none'

    iframe.src = ''
}