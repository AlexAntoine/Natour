const mongoose = require('mongoose');

const local = async()=>{

   return await mongoose.connect('mongodb://127.0.0.1:27017/natour');
}

const production = async()=>{

}

module.exports = {
    local,
    production 
}