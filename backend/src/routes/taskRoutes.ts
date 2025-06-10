import { Task } from "../models/Task";
import express from "express";

const router = express.Router();

// obtener todas las tareas

router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// crear una nueva tarea

router.post("/", async (req, res)=>{
    const {title} = req.body;
    const newTask = new Task({title})
    await newTask.save();
    res.status(201).json(newTask);
});

//marcar tarea como plmletada

router.put("/:id", async(req,res)=>{
    try{
    const task = await Task.findByIdAndUpdate(req.params.id,
        { completed: req.body.completed },
        {new:true});
    res.json(task);
    }catch(error){
        res.status(500).json({error: "Error al actualizar tarea"});
    }
});

//eliminar una tarea

router.delete("/:id", async(req, res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

export default router;