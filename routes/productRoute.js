
const express=require('express');
const { getAllProducts,createProducts,updateAllProducts ,deleteProducts,getProducts,createProductReview, getProdctReviews, deleteReviews, getAdminProducts} = require('../controllers/productController');
const {isAuthenticatedUser,authorizeRoles} =require('../Middleware/auth')
const router=express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProducts);
router.route('/admin/products/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateAllProducts);
router.route('/admin/products/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts);
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts);
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(getProdctReviews)
.delete(isAuthenticatedUser,deleteReviews);
module.exports=router;