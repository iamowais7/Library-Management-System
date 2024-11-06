import {router} from 'express'
import {addBook,getAvailableBooks,updateBook} from '../controllers/bookContoller.js'


router.post('/add',addBook);


router.put('/update/:id',updateBook);


router.get('/available',getAvailableBooks);

module.exports = router;