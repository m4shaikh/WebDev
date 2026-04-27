import { useState } from "react";

const Todo = () => {
    const [input,setInput] = useState('');
    const [todos,setTodos]  = useState([])
    function handleRemove(id){
        setTodos((todos)=>(todos.filter( (todo) => todo.id != id)))
    }
    function handleSubmit(){
            setTodos((todos)=>{

            return todos.concat({
                text:input,
                id:(Math.random()*22)
            })
        })
        setInput('')
    }
    return (

        <div className="main">
            <h2>Todo</h2>
            <div className="container">
                <div className="input-container">
                <input 
                    type="text" 
                    value={input} 
                    placeholder="Enter todo"
                    onChange={(e) =>setInput(e.target.value)}
                />
                <button className="submit" onClick={handleSubmit}>Submit</button>
            </div>
                <div className="tasklist">
                    <ul>
                        {todos.map((todo) => (
                          <li className="todo" key={todo.id}>
                            <span>{todo.text}</span>
                            <button className="remove" onClick={() => handleRemove(todo.id)}>x</button>
                          </li>  
                        ))} 
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Todo;