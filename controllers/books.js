const Book=require('../models/book');
const {StatusCode}=require('http-status-codes');

const getAllBooks= async(req,res)=>{
    //Getting all the books created by the user with userId
    //Make this list searchable using query parameters

    const books=await Book.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCode.OK).json({books});
}
const getBook= async(req,res)=>{

    const{user:{userId},params:{id:bookId}}=req;

    const book=await Book.findOne({_id:bookId,createdBy:userId});
    if(!book){
        //not found error throw the notFound error
        res.status(404).send(`The book with id ${bookId} does not exist`);
    }

    res.status(StatusCode.OK).json({book});
}
const updateBook= async(req,res)=>{

    const{body:{price,description,title},user:{userId},params:{id:bookId}}=req;

    if(price===''|| description===''||title===''){
        //title,price and descritpion cannot be empty,BadRequestError
        res.status(400).send("title,price and description must be present")
    }
    const book=await Book.findByIdAndUpdate({_id:bookId,createdBy:userId},req.body,{new:true,runValidators:true});

    if(!book){
        //not found error throw the notFound error
        res.status(404).send(`The book with id ${bookId} does not exist`);
    }

    res.status(StatusCode.OK).json({book});
}
const deleteBook= async(req,res)=>{

    const{user:{userId},params:{id:bookId}}=req;
    const book=await Book.findByIdAndRemove({_id:bookId,createdBy:userId},req.body);

    if(!book){
        //not found error throw the notFound error
        res.status(404).send(`The book with id ${bookId} does not exist`);
    }

    res.status(StatusCode.OK).send(`The book with id ${bookId} is deleted`);
}
const createBook= async(req,res)=>{
    //Tying the user to the book created
    req.body.createdBy=req.user.userId
    const book=await Book.create(req.body);
    res.status(StatusCode.CREATED).json({book});
}
const getAllBookQueryParams = async (req, res) => {
    const { title,description,price } = req.query;
    const queryObject = {};
    if (title) {
      queryObject.title = title;
    }
    if(price){
      queryObject.price=price;
    }
    if (description) {
      queryObject.description = { $regex: description, $options: 'i' };
    }
    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ['price', 'rating'];
      filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
  
    let result = Book.find(queryObject);
    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
  
   /*  if (fields) {
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    result = result.skip(skip).limit(limit); */
   
  
    const books = await result;
    res.status(200).json({ books, nbHits: products.length });
  };
  
module.exports={getAllBooks,getBook,updateBook,deleteBook,createBook,getAllBookQueryParams}