import mongoose from 'mongoose';
import colors from 'colors';
//const colors = require('colors');
const connectdb = async () => {
    try{
        const conn = await mongoose.connect(process.env.mongo_url)
        console.log(`Connected to mongodb database ${conn.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`Error in mongodb ${error}`.bgRed.white);
    }
}

export default connectdb;