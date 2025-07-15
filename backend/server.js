import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';

import accountRoutes from './routes/accountRoutes.js';
import kartRoutes from './routes/kartRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


try{
    await mongoose.connect("mongodb+srv://kapilsaini0125:SK0imtnncsqV6Qdr@cluster0.9uirnqe.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected Successfully");
}
catch(error){
    console.error("Error connecting to MongoDB:", error);
}


app.use('/api/todos/account', accountRoutes)
app.use('/api', kartRoutes)
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT} `);
})