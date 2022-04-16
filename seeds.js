const mongoose = require('mongoose');
 
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand',(err)=>{
   if(!err){//连接成功了
     console.log('database connect success');
   }else{
      throw err;
   }
})
const p = new Product({
    name:'Ruby Grapefruit',
    price:1.99,
    catagory:'fruit'
})
p.save().then(
    p=>{
        console.log(p)
   
})
.catch(e =>{
    console.log(e)
})