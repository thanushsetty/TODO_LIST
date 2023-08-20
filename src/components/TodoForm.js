import { useState } from "react"
import "./TodoForm.css"
const TodoForm = (props) =>{
    const [newTodo, setNewTodo] = useState("");
    
    const addNewTodo = (event) =>{
        setNewTodo(event.target.value);
    }

    const submitHandler = (event) =>{

        // addtoHandler(todo);
        event.preventDefault();
        props.adder(newTodo);
        setNewTodo("")
    }
    
    return(
        <div>
            <h2 className="heading">TodoInput</h2>
            <form className="form-style"  onSubmit={submitHandler}>
                <input type="text" placeholder="New Todo" value={newTodo} onChange={addNewTodo}></input>
                <button type="submit" className="button">Add New Task</button>
            </form>
        </div>
        
    )
    
}

export default TodoForm;