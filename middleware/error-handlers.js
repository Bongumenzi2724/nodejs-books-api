const {CustomAPIError}=require('../errors');
const {StatusCodes}=require('http-status-codes');
const errorHandlerMiddleWare=(req,res,next)=>{
    let customError={
        statusCode:err.statusCodes|| statusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message||'Something went wrong try again later',
    }
    if(err.name==='ValidationError'){
        customError.msg=Object.values(err.errors).map((item)=>item.message).join(',')
        customError.statusCode=400
    }
    if(err.name==='CastError'){
        customError.msg=`No item found with id:${err.value}`,
        customError.statusCode=404
    }
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message});
    }
    if(err.code && err.code===1000){
        customError.msg=`Duplicate value entered for ${Object.keys(err.keyValue)} field,please choose another value`,
        customError.statusCode=400
    }
    res.status(customError.statusCode).json({msg:customError.msg});
}
module.exports=errorHandlerMiddleWare;