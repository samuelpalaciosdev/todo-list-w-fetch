const TodoList = ({
  todo,
  setTodo,
  handleKeyDown,
  tasks,
  setTasks,
  deleteTodo,
  onError,
}) => {
  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <div className="row">
          <div className="col-md-12">
            <input
              type="text"
              name="todo"
              id="todo"
              className="todo-input"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="current-tasks d-flex flex-column justify-content-center align-items-center mt-4">
              {tasks.length > 0 &&
                tasks.map((todo, index) => (
                  <div
                    className="todo-item d-flex justify-content-center align-items-center"
                    key={index}
                  >
                    <li id={index} className="fw-semibold me-2">
                      {todo.label}
                    </li>
                    <div className="trash-btn" index={index}>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteTodo(index)}
                      ></i>
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
