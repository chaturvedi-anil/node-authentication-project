import express from 'express';
import routes from './routes/index.js';
const PORT = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(routes);
app.listen(PORT, (err)=>{
    if(err) console.log('Error : ',err);
    console.log(`server is runing on ${PORT} port`);
});