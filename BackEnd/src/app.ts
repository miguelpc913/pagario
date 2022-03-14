import createServer from './Utils/createServer'
import 'dotenv/config'
import connectDb from './Utils/connect'

const app = createServer();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URI || ''

const start = async () =>{
    try{
        await connectDb(url);
        app.listen(port)
    }catch(e){
        console.log(e)
    }
}

start();