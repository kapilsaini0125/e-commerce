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
const kartItem= mongoose.model('kartItem', new mongoose.Schema({
      productId: String,
      userId: String, //saare products aa rhe h islyea
      quantity: Number,
      selected: Boolean
      
}));
const Order= mongoose.model('Order', new mongoose.Schema({
      products: [
        {
          productId: String,
          quantity: Number
        }
      ],
        userId: String,
        paymentId: String,
        addrress: String, 
}))
const Address= mongoose.model('Address', new mongoose.Schema({
    address: String
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
    const  checkUserPassword  = req.body.checkUserPassword;
    try {
        console.log("Received login request:", checkUserPassword) // issue
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

app.post('/api/addToKart', async (req, res) => {
    console.log("Received add to kart request:" )
    
    const {productUser, id} = req.body;
        console.log(productUser, id);
    try {
        const newKartItem = new kartItem({ productId: id, userId: productUser, quantity: 1, selected: true });
        await newKartItem.save();
        console.log( newKartItem);
        res.status(201).json({ message: 'Product added to kart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product to kart' });
    }
    
})

app.get('/api/todos/account/kart', async (req, res) => {
    const { productUser } = req.query;
    console.log(productUser);
    try {
        const kartItems = await kartItem.find({
            userId: productUser
 
        });
        console.log("Kart items:", kartItems);
        res.status(200).json(kartItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching kart items' });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT} `);
})