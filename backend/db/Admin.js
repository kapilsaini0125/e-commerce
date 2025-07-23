import mongoose from 'mongoose';

const Admin= new mongoose.Schema({
    adminName: String,
    adminPassword: String
});

export default mongoose.model('Admin', Admin);