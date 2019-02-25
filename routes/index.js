const express = require('express');
const router = express.Router();
const Cart = require('../models/card');

const Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  //  let products = Product.find();

  Product.find(function(err, kittens, next) {
    if (err) return console.error(err);
    //console.log('From db' + kittens);
    const productChunks = [];
    const chunkSize = 3;
    for (let i = 0; i < kittens.length; i += chunkSize) {
      productChunks.push(kittens.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Shopping card',
      products: productChunks
    });
  });
}) ;

router.get('/add-to-cart/:id',function(req,res){
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err,product){
      if(err){
        return res.redirect('/');
      }
      cart.add(product,product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
  });


router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
    return res.render('shop/shopping-card',{products:null});
  }
  let cart = new Cart(req.session.cart);
  res.render('shop/shopping-card' , {products:cart.generateArray(),totalPrice:cart.totalPrice});
})

module.exports = router;
