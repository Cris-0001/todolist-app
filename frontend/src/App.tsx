import React, {useState} from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

const App = () =>{
    const [refresh, setRefresh] = useState(false);

    const handleTaskCreated = () => {
      setRefresh(!refresh); //Cambia el estado para reforzar recarga
    };

  return(
    <div style = {{padding: "2rem", fontFamily: "Arial"}}>
      <h1>Gestor de Tareas</h1>
      <p>¡Aquí aparecen tus tareas!</p>
      <AddTaskForm onTaksCreated={handleTaskCreated} />
      <TaskList key={String(refresh)} />
      </div>
  )
}

export default App;
