import mongoose from 'mongoose';
                  
const Product =  new mongoose.Schema({
      name: String,
      price: String,
      category: String
});

export default mongoose.model('Product', Product);