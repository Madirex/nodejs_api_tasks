const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
mongoose.connect('mongodb://mongo_container:27017/taskdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB correctamente');
});

const allowedOrigins = ['http://localhost:' + port, 'http://localhost:5500', 'http://localhost:8080'];

const taskSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    isFinished: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let tasks = [];

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tareas de la base de datos' });
    }
});

// Obtener una tarea por su ID
app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    // Verificamos si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'ID de tarea no válido' });
    }
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tarea de la base de datos' });
    }
});


// Añadir una nueva tarea
app.post('/tasks', async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Se requieren name y description' });
    }

    try {
        const newTask = await Task.create({
            name,
            description,
            isFinished: false,
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);  // Agregamos esta línea para mostrar el error en la consola
        res.status(500).json({ error: 'Error al crear nueva tarea en la base de datos' });
    }
});

// Borrar una tarea por su ID
app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    // Verificamos si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'ID de tarea no válido' });
    }
    try {
        await Task.findByIdAndDelete(taskId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar tarea de la base de datos' });
    }
});

// Marcar una tarea como (terminada / no terminada) por su ID
app.put('/tasks/:id/complete', async (req, res) => {
    const taskId = req.params.id;
    // Verificamos si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return res.status(400).json({ error: 'ID de tarea no válido' });
    }
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        task.isFinished = !task.isFinished;
        await task.save();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Error al marcar tarea como completada en la base de datos' });
    }
});

app.listen(port, () => {
    console.log(`Server encendido en http://localhost:${port}`);
});
