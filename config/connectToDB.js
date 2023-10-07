const mongoose = require('mongoose');

// load env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

async function connectToDB(){ // if await is used in the body function should be async
    try {
        await mongoose.connect(process.env.LM_DB_URL);
        console.log("Connected To DB");
    } catch(err){
        console.log(err);
    }
}

module.exports = connectToDB;