const mongoose=require('mongoose')
mongoose.set('strictQuery',true);

const ConnectDB=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        /* useCreateIndex:true,
        useFindAndModify:false, */
        useUnifiedTopology:true,

    })
}
module.exports=ConnectDB;