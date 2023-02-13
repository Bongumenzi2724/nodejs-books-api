const User=require('../models/user');
const jwt=require('jsonwebtoken');

const auth= async (req,res,next)=>{
    //check the header
    const authHeader=req.header.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        //Throw an unauthenticated error
        res.status(404).send("Unauthenticated error");
    }
    const token=authHeader.split('')[1];
    try {
        //jwt from the environment variables
        const payload=jwt.verify(token,'jwtSecret');
        //attach the user to the book routes
        req.user={userId:payload.userId,name:payload.name};
        //important next
        next();
    } catch (error) {
        //Throw an unauthenticated error
        //Throw new UnauthenticatedError("Authentication invalid")

        console.log(error);
    }
}
module.exports=auth