import React from 'react';
import TaskList from './components/TaskList';

const App = () =>{
  return(
    <div style = {{padding: "2rem", fontFamily: "Arial"}}>
      <h1>Gestor de Tareas</h1>
      <p>¡Aquí aparecen tus tareas!</p>
      <TaskList/>
      </div>
  )
}

export default App;
