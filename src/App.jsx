import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState(""); // Use lowercase for consistency
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    let todosstring = localStorage.getItem("todos");
    if (todosstring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (todo) => {
    // Implement logic to edit the specified todo item
    // Here you could prompt the user for new content, update the state with the edited todo
    const newTodo = prompt("Enter the new todo:", todo.todo);
    if (newTodo) {
      const updatedTodos = todos.map((item) =>
        item === todo ? { ...item, todo: newTodo } : item
      );
      setTodos(updatedTodos);
      savetoLS();
    }
  };

  const handleDelete = (todo) => {
    // Implement logic to delete the specified todo item
    const confirmation = window.confirm(
      `Are you sure you want to delete "${todo.todo}"?`
    );
    if (confirmation) {
      const filteredTodos = todos.filter((item) => item !== todo);
      setTodos(filteredTodos);
      savetoLS();
    }
  };

  const handleAdd = () => {
    if (!todo.trim()) {
      return; // Prevent adding empty todos
    }

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); // Use lowercase for consistency
    setTodo("");
    savetoLS();
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleComplete = (todo) => {
    // Implement logic to mark a todo as completed/incomplete
    const updatedTodos = todos.map((item) =>
      item === todo ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    savetoLS();
  };

  const handlecheckbox = (event) => {
    let id = event.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  };
  return (
    <>
      <Navbar />

      <div className="  ml-96 mr-8 my-5 rounded-xl bg-violet-200 p-4 min-h-[80vh] md: w-2/4">
        <h1 className="font-bold text-center  text-xl">
          iTask manage your todos at one place
        </h1>
        <div className="addtodo my-5 flex flex-col" >
          <h2 className="text-xl font-semibold my-4">Add a todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full ml-1 rounded-full p-2"
            placeholder="Enter your todo"
          />
          <button
            className="btn bg-violet-800 hover:bg-violet-950 py-3 text-white rounded-full  text-sm font-bold  m-3  w-auto"
            onClick={handleAdd}
          >
            Save
          </button>
        </div>

        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-4"> No Todos to display </div>
          )}
          {todos.map((item) => (
            <div key={item.id} className="todo flex my-4 justify-between">
              <div className="flex gap-4">
                <input
                  name={item.id}
                  onChange={handlecheckbox}
                  type="Checkbox"
                  value={item.isCompleted}
                  id=""
                />
                <div
                  className={item.isCompleted ? "line-through" : ""}
                  onClick={() => handleComplete(item)}
                >
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex flex-row">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-full mx-2 text-sm font-bold"
                >
                  <FaEdit/>
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="btn bg-violet-800 hover:bg-violet-950 p-3 py-2  text-white rounded-full mx-1 text-sm font-bold"
                >
                  <MdDeleteForever/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
