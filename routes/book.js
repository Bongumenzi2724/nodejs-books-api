const express=require('express');
const router=express.Router();
const {getAllBooks,deleteBook,getBook,createBook,updateBook,getAllBookQueryParams}=require('../controllers/books');

router.route('/').get(getAllBooks).post(createBook).get(getAllBookQueryParams);
router.route('/:id').delete(deleteBook).get(getBook).patch(updateBook);

module.exports=router