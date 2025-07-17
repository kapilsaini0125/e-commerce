import mongoose from 'mongoose';

const KartItem= new mongoose.Schema({
      productId: String,
      userId: String, //saare products aa rhe h islyea
      quantity: Number,
      selected: Boolean,
      product: [{
            name: String,
            price: Number,
            category: String
      }]
})

export default mongoose.model('KartItem', KartItem)