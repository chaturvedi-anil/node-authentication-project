import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/nodejs_authentication_db';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error)=>{
    console.error('MongoDB connection error:', error);
});

db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

export default db;