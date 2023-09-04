import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_CLOUD_SERVER;
mongoose.connect(uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);

const db = mongoose.connection;

db.on('error', (error)=>{
    console.error('MongoDB connection error:', error);
});

db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

export default db;