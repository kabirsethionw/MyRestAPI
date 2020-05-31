const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Definig geo schema
// "geometry":{
//     "type": "Point",
//     "coordinate": [261.3,78.9]
// }
const geoSchema = new schema({
    type:{ // refers to the type of geo cordinates used in the map 
        type: String, 
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }

});

// Defining user schema 
const usrSchema = new schema({
    name:{
        type: String,
        required: [true,'Name field is Required']
    },
    rank:{
        type: String,
    },
    available:{
        type: Boolean,
        default: false
    },
    geometry: geoSchema
});

const usrx = mongoose.model('user', usrSchema);

module.exports = usrx;