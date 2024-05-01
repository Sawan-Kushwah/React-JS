import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState({});

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handelChange = (e) => {
    setTask({
      id: uuidv4(),
      title: e.target.value,
      isCompleted: false
    });
  }


  const addTask = () => {
    if (!task.title) return;

    setTodos(prevTodo => [...prevTodo, { id: task.id, title: task.title, isCompleted: task.isCompleted }]);
    // console.log(task.id);
    setTask("");
    saveToLocalStorage();

  }

  const handelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(todo => todo.id === id);
    let newTodo = [...todos]; // refrence same tha isliye ... se copy krna pada ab naya array ban gaya h newtodo
    newTodo[index].isCompleted = !newTodo[index].isCompleted;
    setTodos(newTodo);
    saveToLocalStorage();

  }

  const handelDelete = (e, id) => {
    let newTodo = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodo);
    saveToLocalStorage();
  }

  const handelEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTask(t[0]);
    handelDelete(e, id);
    saveToLocalStorage();
  }

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todoLS = JSON.parse(todosString);
      setTodos(todoLS);
    }
  }, []);


  return (
    <>
      <div className="container max-w-6xl m-auto border border-white h-[70vh] mt-5">
        <h1 className="text-3xl font-bold text-center">
          Your Daily Task Manager
        </h1>
        <div className="inputs text-center mt-6 max-sm:flex max-sm:flex-col">
          <input type="text" name="task" id="task" value={task.title ? task.title : ""} onChange={handelChange} className='px-4 py-2 mx-3 w-1/2 rounded-xl max-sm:w-11/12 max-sm:m-auto max-sm:mb-[10px]' placeholder='Add a task...' />
          <button type="submit" className="btn w-[120px] m-auto" id='saveButton' onClick={addTask}>Save Task</button>
        </div>
        <div className="showTask my-5 px-7 max-md:px-1">
          <h1 className="text-xl font-bold">Your taskDetails</h1>
          {todos.length == 0 && <div className='text-center text-lg m-3'>No tasks added yet!</div>}
          {/* This should be return as we add new task */}


          {todos.map(todo => {
            return (
              <div className="taskDetails flex justify-around items-center py-4 max-sm:flex-col " key={todo.id}>
                <div className="checkbox-text flex w-3/4 items-center max-sm:w-full max-sm:pb-5">
                  <div className="checkbox pr-3">
                    <input type="checkbox" name={todo.id} id="isCompleted" className='checkbox h-6 w-6 cursor-pointer' onChange={handelCheckbox} />
                  </div>
                  <div className={`  ${todo.isCompleted ? "line-through" : ""}`}>
                    {todo.title}
                  </div>
                </div>
                <div className="taskOperation">
                  <div className="remove flex max-md:flex-col gap-y-8 max-sm:flex-row gap-x-2">
                    <button className="editTask px-3 mr-2" onClick={(e) => handelEdit(e, todo.id)}  >Edit Task</button>
                    <button className="removeTask px-3" onClick={(e) => handelDelete(e, todo.id)}>Remove Task</button>
                  </div>
                </div>
              </div>
            )
          }
          )
          }



        </div>
      </div>
    </>
  )
}

export default App
