
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectdb from './config/db.js';
import authroute from './routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './routes/CategoryRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';

dotenv.config();

connectdb();
//rest obj
const app = express();

//middleswares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authroute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',ProductRoutes);

app.get('/',(req,res) => {
    res.send(`<h1>Welcome to the app<\h1>`)
})

const port = process.env.port || 8080;

app.listen(port,() => {
    console.log(`Server is running on ${process.env.dev_mode} mode on port ${port}`.bgCyan.white)
})