const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62c9f7e4286bfa6ba689e60a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry : { 
                type : "Point", 
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
            ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/dxcno2abz/image/upload/v1657511375/YelpCamp/xqd8gx8pvquwg1kghtry.jpg',
                filename: 'YelpCamp/xqd8gx8pvquwg1kghtry',
            },{
                url: 'https://res.cloudinary.com/dxcno2abz/image/upload/v1657511375/YelpCamp/i7mnbdvzu6gotmqbhfgr.jpg',
                filename: 'YelpCamp/i7mnbdvzu6gotmqbhfgr',
            }
        ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})