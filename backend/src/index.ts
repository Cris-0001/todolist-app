import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Hola, el servidor está funcionando! 🚀");
});

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor conectado a MongoDB y escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

  //rutas para tareas
  app.use("/api/tasks", taskRoutes);