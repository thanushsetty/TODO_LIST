import React, {useState, useEffect} from 'react';
import TodoForm from './components/TodoForm';
import ToDo from './components/ToDo';

const App = () =>{
  // const DummyTodos = ["Learn React", "Practice"];
  const [showDone, setShowDone] = useState(false);
  const [showUnDone, setShowUnDone] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isDone, setIsDone] = useState(false) 

  const[todos, setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos) {
      return JSON.parse(savedTodos);
    }
    else{
      return [];
    }
  });

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
    setShowAll(true)
  },[todos])
    
  
  const addTodoHandler = (newTodo) =>{
    if(newTodo !== ""){
      setTodos((prevTodos) =>[...prevTodos, {id: Date.now(), title: newTodo.trim(), done: false}])
    }
  }
  
  const deleteTodoHandler = (remTodo) =>{
      const filtered = todos.filter(item => item.id !== remTodo)
      setTodos(filtered);
  }

  const editTodoHandler = (id,editTodo) =>{
      console.log(editTodo);
      console.log(id);

      const updated = todos.map(item =>{
        if(item.id===id){
          return {...item, title:editTodo};
        }
        else{
          return item;
        }
      } )
      setTodos(updated)
  }

  const doneTodoHandler = (id) => {
    setIsDone(!isDone);
    const updatedTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    console.log(updatedTodos)
  
    setTodos(updatedTodos);
  }

  const completedTasks = todos.filter(item => item.done);
  console.log(completedTasks);
  
  const uncompletedTasks = todos.filter(item => !item.done);

  const onDoneHandler = () =>{
    setShowDone(true);
    setShowAll(false)
    setShowUnDone(false);
    console.log(showDone)
  }

  const onAllHandler =() =>{
    setShowAll(true);
    setShowDone(false);
    setShowUnDone(false);
  }

  const onUnDoneHandler =() =>{
    setShowAll(false);
    setShowDone(false);
    setShowUnDone(true);
  }

  const deleteAllHandler = () => {
    setTodos([]); 
  };

  const deleteDoneHandler = () =>{
    setTodos(uncompletedTasks);
  }

  return(
    <div className="wrapper">
      <TodoForm adder={addTodoHandler}/>
      <h2 className='subheading'>Todo List</h2>
      <div className="buttons">
        <button onClick={onAllHandler}>All</button>
        <button onClick={onDoneHandler}>Done</button>
        <button onClick={onUnDoneHandler}>Todo</button>
      </div>
      {todos.map((todo) => {
        if (
          (showAll && !showDone && !showUnDone) ||
          (showDone && todo.done) ||
          (showUnDone && !todo.done)
        ) {
          return (
            <ToDo
              deleter={deleteTodoHandler}
              editer={editTodoHandler}
              title={todo.title}
              id={todo.id}
              done={todo.done}
              doner={doneTodoHandler}
              key={todo.id}
            />
          );
        }
        return null; // Don't render if it doesn't match the filter
      })}
      {/* {showAll && todos.map((todo)=>(
        <ToDo 
          deleter={deleteTodoHandler}
          editer={editTodoHandler} 
          title={todo.title}
          id = {todo.id}
          done = {todo.done}
          doner = {doneTodoHandler}
          key ={todo.id}
        />
      ))}
      {showDone && completedTasks.map((todo)=>(
        <ToDo 
          deleter={deleteTodoHandler}
          editer={editTodoHandler} 
          title={todo.title}
          id = {todo.id}
          done = {todo.done}
          doner ={doneTodoHandler}
          key ={todo.id} />
      ))}
      {showUnDone && uncompletedTasks.map((todo)=>(
        <ToDo 
          deleter={deleteTodoHandler}
          editer={editTodoHandler} 
          title={todo.title}
          id = {todo.id}
          done = {todo.done}
          doner ={doneTodoHandler}
          key ={todo.id} />
      ))} */}


      <div className='allButtons'>
        <button className='dd' onClick={deleteDoneHandler}>Delete Done Tasks</button>
        <button className='dd' onClick={deleteAllHandler}>Delete All Tasks</button>
      </div>

    </div>
  )
}

export default App;
