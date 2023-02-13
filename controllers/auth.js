const User=require('../models/user');

const {StatusCodes}=require('http-status-codes');

const register= async (req,res)=>{
    
    const user=await User.create({...req.body});
    const token=user.createJWT();
    console.log(user,token);
    res.status(StatusCodes.CREATED).json({user,token}); 
}
const login= async (req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        //Throw a BadRequestError instance
        res.status(404).send("Please provide email and password");
    }
    const user=await User.findOne({email});
    //compare passwords
    const correctPassword=await user.comparePasswords(password);
    if(!correctPassword){
        //incorrect password unauthenticated user
        res.status(400).send("Incorrect password entered");
    }
    if(!user){
        //Unauthenticated User
        res.status(400).send("This user does not exist");
    }

    const token=user.createJWT()
   res.status(StatusCodes.OK).json({user:{name:user.name},token});
  // res.status(200).send("user logged in")
}
module.exports={register,login};