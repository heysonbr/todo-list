import React, { useState } from "react";

const TaskList = () => {
  // Definimos el estado para la tarea actual, la lista de tareas, si estamos editando, el ID de la tarea que estamos editando y la alerta
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // Definimos la función que se ejecutará cuando se envíe el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    if (!task) {
      // Si la tarea está vacía, mostramos una alerta
      setAlert({
        show: true,
        msg: "Por favor, introduce una tarea",
        type: "danger",
      });
    } else if (task && isEditing) {
      // Si estamos editando, actualizamos la tarea en la lista
      setTaskList(
        taskList.map((item) => {
          if (item.id === editID) {
            return { ...item, task }; // Si el ID coincide, actualizamos la tarea
          }
          return item; // Si no, devolvemos la tarea tal cual
        })
      );
      // Reseteamos el estado
      setTask("");
      setEditID(null);
      setIsEditing(false);
      setAlert({ show: true, msg: "Valor cambiado", type: "success" });
    } else {
      // Si no estamos editando, añadimos la tarea a la lista
      const newTask = { id: new Date().getTime().toString(), task };
      setTaskList([...taskList, newTask]);
      // Reseteamos el estado
      setTask("");
      setAlert({
        show: true,
        msg: "Tarea añadida a la lista",
        type: "success",
      });
      console.log(taskList);
    }
  };

  // Renderizamos el componente
  return (
    <div className="container">
      {alert.show && <p className={`alert alert-${alert.type}`}>{alert.msg}</p>}{" "}
      {/* Mostramos la alerta si es necesario */}
      <div className="">
        <form onSubmit={handleSubmit} className="form">
          {" "}
          {/* Cuando se envíe el formulario, llamamos a handleSubmit */}
          <input
            type="text"
            placeholder="Escribe una tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)} // Cuando cambie el valor del input, actualizamos el estado
          />
          <button type="submit">{isEditing ? "Editar" : "Añadir"}</button>
          {/* El texto del botón cambia si estamos editando */}
        </form>
        <div>
          {taskList.map(
            (
              item // Para cada tarea en la lista, renderizamos un div con la tarea y los botones de editar y eliminar
            ) => (
              <div
                key={item.id}
                className="task-item row d-flex justify-content-center"
              >
                <h5 className="d-flex justify-content-center align-items-center m-3">
                  {item.task}
                  <button
                    className="edit-button m-1"
                    onClick={() => {
                      // Cuando se haga click en el botón, actualizamos el estado para editar la tarea
                      setTask(item.task);
                      setEditID(item.id);
                      setIsEditing(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button m-1"
                    onClick={() => {
                      // Cuando se haga click en el botón, eliminamos la tarea de la lista
                      setTaskList(
                        taskList.filter((task) => task.id !== item.id)
                      );
                      setAlert({
                        show: true,
                        msg: "Tarea eliminada",
                        type: "danger",
                      });
                    }}
                  >
                    Eliminar
                  </button>
                </h5>
              </div>
            )
          )}
        </div>
        <div>
          <p>
            {taskList.length > 0
              ? `Hay ${taskList.length} ${
                  taskList.length === 1 ? "tarea" : "tareas"
                }` // Mostramos el número de tareas en la lista
              : "Agrega Tareas"}{" "}
            {/*Si no hay tareas, mostramos un mensaje para que se añadan*/}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
