import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './api/router/mainRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/', routes);

app.use('*', (req,res)=>{
    res.status(404).json({error:"not found"})
});

export default app