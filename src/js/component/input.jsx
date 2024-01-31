import React, { useState } from "react";

const TaskList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      // Alerta si no hay nada escrito
      setAlert({
        show: true,
        msg: "Por favor, introduce una tarea",
        type: "danger",
      });
    } else if (task && isEditing) {
      // Editar Tarea
      setTaskList(
        taskList.map((item) => {
          if (item.id === editID) {
            return { ...item, task };
          }
          return item;
        })
      );
      setTask("");
      setEditID(null);
      setIsEditing(false);
      setAlert({ show: true, msg: "Valor cambiado", type: "success" });
    } else {
      // Agregar Tarea
      const newTask = { id: new Date().getTime().toString(), task };
      setTaskList([...taskList, newTask]);
      setTask("");
      setAlert({
        show: true,
        msg: "Tarea añadida a la lista",
        type: "success",
      });
    }
  };

  return (
    <div className="container">
      {alert.show && <p className={`alert alert-${alert.type}`}>{alert.msg}</p>}
      <div className="">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Escribe una tarea"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">{isEditing ? "Editar" : "Añadir"}</button>
        </form>
        <div>
          {taskList.map((item) => (
            <div
              key={item.id}
              className="task-item row d-flex justify-content-center"
            >
              <h5 className="d-flex justify-content-center align-items-center m-3">
                {item.task}
                <button
                  className="edit-button m-1"
                  onClick={() => {
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
                    setTaskList(taskList.filter((task) => task.id !== item.id));
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
          ))}
        </div>
        <div>
          <p>
            {taskList.length > 0
              ? `Hay ${taskList.length} ${
                  taskList.length === 1 ? "tarea" : "tareas"
                }`
              : "Agrega Tareas"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
