let Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true });
let db = mongoose.connection;
//  db.on(error,console.error.bind(console , 'connection error:'));
db.once('open' , function(){
  console.log("We are connected to shopping db");
  let products = [
    new Product({
      imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefTiSyshhFHomlckQW5RFY_wC-X2UaO7o5fWnjiYsqWoh3jztJg",
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefTiSyshhFHomlckQW5RFY_wC-X2UaO7o5fWnjiYsqWoh3jztJg",
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefTiSyshhFHomlckQW5RFY_wC-X2UaO7o5fWnjiYsqWoh3jztJg",
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefTiSyshhFHomlckQW5RFY_wC-X2UaO7o5fWnjiYsqWoh3jztJg",
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    }),
    new Product({
      imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefTiSyshhFHomlckQW5RFY_wC-X2UaO7o5fWnjiYsqWoh3jztJg",
      title: 'Gothic Video Game',
      description: 'Awesome Game!!!!',
      price: 10
    })
  ];
  let done =0;
  for (let i = 0; i < products.length; i++) {
  //  products[i].save(function(err,result){
      done++;
      if(done===products.length){
        exit();
      }
    });
  }
  /*
  products.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
});
*/
function exit() {
  mongoose.exit();
}
