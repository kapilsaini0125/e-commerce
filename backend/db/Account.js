import mongoose from 'mongoose';                  
const Account =  new mongoose.Schema({
      userName: String,
      userPassword: String
});

export default mongoose.model('Account', Account);