const tasks = document.querySelectorAll(".tasks");
const columns = document.querySelectorAll(".column")

tasks.forEach((task) => {
    task.addEventListener("dragstart",(event)=>{
        
        task.id = "dragged-task"
        event.dataTransfer.setData("task","")

    })
    task.addEventListener("dragend",(event)=>{
        task.removeAttribute('id')
       
        
    })
});

columns.forEach((column) => {
  column.addEventListener("dragover", (event) => {
    // Test a custom type we will set later
        if (event.dataTransfer.types.includes("task")) {
        event.preventDefault();
        }
    });
    column.addEventListener("dragenter", (event) => {
    if (event.dataTransfer.types.includes("task")) {
      column.classList.add("over");
    }
  });
    column.addEventListener("dragleave", (event) => {
    if (!column.contains(event.relatedTarget)) {
      column.classList.remove("over");
    }
  });
});

columns.forEach((column) => {
  column.addEventListener("drop", (event) => {
    event.preventDefault();

    const draggedTask = document.getElementById("dragged-task");
    draggedTask.remove();
    column.children[1].appendChild(draggedTask);
    column.classList.remove("over");
 
  });
});
