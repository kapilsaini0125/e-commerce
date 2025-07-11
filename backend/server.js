import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


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



const Account= mongoose.model('Account', new mongoose.Schema({
      userName: String,
      userPassword: String
}))
const Product= mongoose.model('User', new mongoose.Schema({
      name: String,
      price: String,
      category: String,
      choosed: Boolean 
}));
const Order= mongoose.model('Kart', new mongoose.Schema({
      totalProduct: String
}))





const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT} `);
})