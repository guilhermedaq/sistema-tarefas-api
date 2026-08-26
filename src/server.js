import express from 'express';
import dotenv from 'dotenv';
import router from './routes/tarefaRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js';

dotenv.config();

const app = express();
//middlewares
app.use(express.json());
app.use('/tarefas', router)
app.use('/usuarios', usuarioRouter)




app.listen(3000, ()=>{
        console.log('Servidor rodando')
});