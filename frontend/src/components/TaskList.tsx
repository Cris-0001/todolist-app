import React, {useEffect, useState} from "react";

type Task = {
    _id: string;
    title: string;
    completed: boolean;
};

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then((res) => res.json())
            .then((data)=> setTasks(data))
            .catch((error)=> console.error("Error al cargar tareas: ",error));
    },[]);

    return(
        <div>
            <h2>
                Lista de tareas
            </h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title}{task.completed ? '✅' : '❌'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;