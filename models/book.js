const mongoose=require('mongoose');

const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,'Please provide name for the book'],
        maxlength:50,
    },
    description:{
        type:String,
        require:[true,'Please provide description for the book'],
        maxlength:150,
    },
    price:{
        type:String,
        require:[true,'Please provide price for the book'],
        maxlength:50,
    },
    image:{
        type:String,
        require:[true,'Please provide cover image for the book'],
        maxlength:50,
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    },
},{timestamps:true})
module.exports=mongoose.model('Book',BookSchema);