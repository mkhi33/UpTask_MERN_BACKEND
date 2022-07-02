import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js';

import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectosRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express();
app.use(express.json())


dotenv.config()

conectarDB()

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback ) {
        console.log(origin)
        if(whiteList.includes(origin)){
            // Puede consultar la API
            callback(null, true)
        }else {
            // No esta permitido
            callback( new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

// Routing

app.get('/', (req, res) => {
    res.json({
        msg: 'Bienvenido a UpTask'
    })
})

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

const servidor = app.listen(PORT , () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});

// Socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

io.on('connection', (socket) => {
    //console.log("Conectado a Socket.io")

    // Definir los eventos de socket.io
    socket.on('onAbrirProyecto', (proyecto) => {
        socket.join(proyecto)
    })

    socket.on('onNuevaTarea', (tarea) => {
        const proyecto  = tarea.proyecto
        socket.to(proyecto).emit('onTareaAgregada', tarea)
    })
    socket.on('onEliminarTarea', (tarea) => {
        const proyecto  = tarea.proyecto
        socket.to(proyecto).emit('onTareaEliminada', tarea)
    })
    socket.on('onActualizarTarea', (tarea) => {
        const proyecto  = tarea.proyecto._id
        socket.to(proyecto).emit('onTareaActualizada', tarea)
    })
    socket.on('onCambiarEstado', (tarea) => {
        const proyecto  = tarea.proyecto._id
        socket.to(proyecto).emit('onNuevoEstado', tarea)
    })
})