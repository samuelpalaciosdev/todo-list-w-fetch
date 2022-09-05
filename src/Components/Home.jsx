import { useEffect, useState } from "react";
import TodoList from "./TodoList";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [onError, setOnError] = useState("none");

  const getTasks = async () => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/samuelpalaciosdev")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const putTask = async () => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/samuelpalaciosdev", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const deleteTodo = (index) => {
    let auxArr = [...tasks];
    auxArr[index] = null;
    let filtered = auxArr.filter((e) => e !== null);
    setTasks(filtered);
    console.log(`Deleted Todo number ${index}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && todo !== "") {
      let auxArr = [...tasks];
      let newTask = { label: e.target.value, done: false };
      auxArr.push(newTask);
      setTasks(auxArr);
      setTodo(""); // Reset input
      putTask();
    } else if (e.key === "Enter") {
      console.log("Error, please add a task!");
      setError("Error, please add a task!");
      setOnError("inline");
    }
  };

  const deleteAllTodos = () => {
    setTasks([]);
  };

  return (
    <>
      <div className="bg-primary" style={{ minHeight: "100vh" }}>
        <div className="container">
          <h1 className="text-center text-light pt-5 mb-4">Todo list :)</h1>
          <div className="todo-list-container d-flex flex-column justify-content-center align-items-center">
            <TodoList
              todo={todo}
              setTodo={setTodo}
              handleKeyDown={handleKeyDown}
              tasks={tasks}
              setTasks={setTasks}
              deleteTodo={deleteTodo}
              onError={onError}
            />
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-5">
            <div className="delete-everything-container d-flex justify-content-center align-items-center">
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteAllTodos}
                  >
                    Delete everything!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
