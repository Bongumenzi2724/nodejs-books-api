const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name'],
        maxlength:100,
        minlength:2,
    },
    email:{
        type:String,
        required:true,
        //match;[]
        match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',],
        unique:true,
    }
    ,
    /* authorPseudonym:{
        type:String,
        required:[true,'Please provide your pseudonym'],
        minlength:2,
        maxlength:100,
    }, */
    password:{
        type:String,
        required:[true,'Please provide your password'],
        minlength:2,
        unique:true,
    },
})

UserSchema.methods.comparePasswords=async function(EnteredPassword){
    const isMatch=await bcrypt.compare(EnteredPassword,this.password);
    return isMatch;
}

UserSchema.methods.createJWT= function(){
    return jwt.sign({userId:this._id,name:this.name},'jwtSecret',{expiresIn:'30d',});
}
UserSchema.pre('save',async function(next){
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
next();
})

module.exports=mongoose.model('User',UserSchema);