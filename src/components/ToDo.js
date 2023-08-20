import { useState } from "react"
import "./ToDo.css"
import delete_button from '../assets/trash.png'

const ToDo = (props) => {

    const [isEditing, setIsEditing] = useState(false)
    const [changedTodo, setChangedTodo] = useState()
    const deleteHandler = () => {
        props.deleter(props.id)
    }
    const editHandler = () => {
        setIsEditing(true)
    }
    const editChanger = (event) => {
        setChangedTodo(event.target.value)
    }
    const editSubmitHandler = () => {
        if(changedTodo !== undefined){
            props.editer(props.id, changedTodo)
            setIsEditing(false);
        }
        
    }
    return (
        <div className="todo">
            {!isEditing && <h3 className={props.done ? "strike title" : "title"}>{props.title}</h3>}
            {isEditing &&
                <form onSubmit={editSubmitHandler}>
                    <input type="text" placeholder={props.title} onChange={editChanger}></input>
                    <button className="okButton" type="submit">OK</button>
                </form>}
            <div className="options">
                {/* <input type="checkbox" onChange={props.doner(props.id)} checked={props.done}></input> */}
                <input
                    type="checkbox"
                    onChange={() => props.doner(props.id)}
                    checked={props.done}
                />
                <button className="editButton" onClick={editHandler}>Edit</button>
                <button className="deleteButton" onClick={deleteHandler}>Delete</button>
            </div>

        </div>
    )
}

export default ToDo;