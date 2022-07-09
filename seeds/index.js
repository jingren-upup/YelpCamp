const express = require('express');
const cities = require('./cities');
const{places,descriptors} = require('./seedHelpers');
const mongoose = require('mongoose');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
  useNewUrlParser:true,  
  useUnifiedTopology:true
})
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected")
});
const sample =(array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0; i <50;++i){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'62c9f7e4286bfa6ba689e60a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/9998758",
            description: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id ad libero beatae neque nam quaerat, error consequuntur maiores dolorum, quibusdam obcaecati! Sequi, et impedit debitis placeat officiis deleniti! Culpa, quasi.',
            price
        })
        await camp.save(); 
    }

}
seedDB().then(() => {
    mongoose.connection.close();
})