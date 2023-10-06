import express from 'express';
import { productCreate, productDelete, productDetail, productList, productUpdate, searchProducts } from '../controllers/productController.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router()

//Show all products
router.get('/', productList)
//Show product detail
router.get('/detail/:id', productDetail)
//Create product
router.post('/create', upload.single('img'), productCreate)
//Update product
router.put('/edit/:id', upload.single('img'), productUpdate)
//Delete product
router.delete('/delete/:id', productDelete)
//Search products
router.get('/search', searchProducts);

export default router