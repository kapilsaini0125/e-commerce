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
const Product= mongoose.model('Product', new mongoose.Schema({
      name: String,
      price: String,
      category: String
      
}));
const Kart= mongoose.model('Kart', new mongoose.Schema({
      _name: String,
      _price: String,
      _category: String,
      selected: Boolean
    
}));
const Order= mongoose.model('Order', new mongoose.Schema({
      totalProduct: [
        {
          productId: String,
          quantity: Number
        }
      ]
}))

app.post('/api/todos/account/signup', async (req, res) => {
    const { name, password } = req.body;
    try {
        console.log("Received signup request:" )
        const newAccount = new Account({ userName: name, userPassword: password });
        await newAccount.save();
        res.status(201).json({ id: newAccount._id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating account' });
    }
})

app.post('/api/todos/account/login', async (req, res) => {
    const { checkUserPassword } = req.body;
    try {
        console.log("Received login request:" )
        const user = await Account.findOne({ userPassword: checkUserPassword });
        console.log("User", user);
        
           res.status(200).json({ id: user ? user._id : null });
           
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }

})

app.get('/api/todos/account/products', async (req, res) => {
    
    
    const sampleProducts= [
        { 
          name: "phone",
          price: "500",
          category: "electronics"
        },
        { 
          name: "laptop",
          price: "100",
          category: "electronics"
        },
        { 
          name: "watch",
          price: "8000",
          category: "electronics"
        },
        { 
          name: "Alexa",
          price: "4300",
          category: "electronics"
        }
    ]
    
    const result = await Product.insertMany(sampleProducts);
    
    res.json(result);

})

app.get('/api/addToKart', async (req, res) => {
    console.log("Received add to kart request:" )
    
    const { name, price, category } = req.body;
        
    try {
        const newProduct = new Kart({ _name: name, _price: price, _category: category, selected: true });
        await newProduct.save();
    } catch (error) {
        res.status(500).json({ error: 'Error adding product to kart' });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT} `);
})