import { error } from "console";
import React, {useEffect, useState} from "react";

type Task = {
    _id: string;
    title: string;
    completed: boolean;
};

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    },[]);

    const fetchTasks=()=>{
            fetch('http://localhost:5000/api/tasks')
            .then((res) => res.json())
            .then((data)=> setTasks(data))
            .catch((error)=> console.error("Error al cargar tareas: ",error));
    };

    //funcion para eliminar una tarea

    const handleDelete = async(id:string) =>{
        try{
            const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchTasks();// recarga las tareas despues de haber eliminado una tarea
            }

        }catch(error){
            console.log('Error al eliminar tarea',error)
        }
    };

    // fincion para actualizar el estado de la tera

    const handleToggleComplete = async (task : Task) => {
        try{
            const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`,{
                method : 'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({completed: !task.completed}),
            });

            if(res.ok){
                fetchTasks();
            }
        }catch(error){
            console.log("Error al actualizar la tarea",error);
        }
    };

    return(
        <div>
            <h2>
                Lista de tareas
            </h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title}{task.completed ? '✅' : '❌'}{' '}
                        <button onClick={()=>handleToggleComplete(task)}>
                            {task.completed ? 'Desmarcar' : 'Completar'}
                        </button>{" "}
                        <button onClick={()=> handleDelete(task._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;