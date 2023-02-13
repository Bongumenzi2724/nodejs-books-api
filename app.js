require('dotenv').config()
require('express-async-errors')

const express=require('express');
const cors=require('cors')
const xss=require('xss')
const rateLimit=require('express-rate-limit')
const app=express()

const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimit=require('express-rate-limit')

//Database connection
const connectDB=require('./db/connect');
const authenticateUser=require('./middleware/authMiddleware');
//extra security

//routers 
const authRouter=require('./routers/auth');
const booksRouter=require('./routes/book');
//middleware setup
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//routes
app.use('/api/auth',authRouter)
app.use('/api/books',authenticateUser,booksRouter)
//Books for the unauthenticated user with searchable capability
app.use('/api/books',booksRouter);
//extra security packages
app.set('trust proxy',1);
app.use(rateLimit({
    windowsMS:15*60*1000,// limit each IP to 100 requests per windowMs
    max:100,
}))

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())

//Error Handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const PORT=process.env.PORT||3000;
/* const connectionString='mongodb+srv://BongumenziNzama:123arsenal@cluster0.tqrra6d.mongodb.net/?retryWrites=true&w=majority'; */
const start=async()=>{
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port,console.log(`Server is listening to port ${PORT}....`))
    } catch (error) {
        console.log(error);
    }
}
start();

/* app.get('/api/v1/hello',(req,res)=>{
    res.send("Hello RapidAPI client")
}) */
/* const PORT=process.env.PORT || 3000
const connectionString='mongodb+srv://BongumenziNzama:123arsenal@cluster0.tqrra6d.mongodb.net/?retryWrites=true&w=majority';
 */
