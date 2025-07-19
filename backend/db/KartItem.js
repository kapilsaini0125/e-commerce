import mongoose from 'mongoose';

const KartItem= new mongoose.Schema({
      userId: String, //saare products aa rhe h islyea
      product: [{
            name: String,
            price: Number,
            category: String,
            quantity: Number,
            productId: String,
      
      }]
})

export default mongoose.model('KartItem', KartItem)