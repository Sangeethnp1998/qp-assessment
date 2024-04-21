import express,{Application} from 'express';
import dotenv from 'dotenv';
import syncDbModel from './model';
import auth from './routes/auth/auth'
import groceryRoute from './routes/grocery/grocery'
import orderRoute from './routes/order/order'

const app : Application = express();

dotenv.config();
syncDbModel();
const PORT : number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

//middleware
app.use(express.json());


//adding routes
app.use('/auth',auth)
app.use('/grocery',groceryRoute)
app.use('/order',orderRoute)

app.listen(PORT,async ()=>{
    console.log("Connected to port - ",PORT)
})