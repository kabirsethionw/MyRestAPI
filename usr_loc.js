const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const x = express();

mongoose.connect('mongodb://localhost/find_usr',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
mongoose.Promise = global.Promise;
//using body-parser middleware
x.use(bodyParser.json()); //body-parser is antecedent as the post request are handled first by it so that the body content is available to api accessing it
x.use('/api',routes); //using middleware 'routes'
// handling errors
x.use((err,req,res,next)=>{
    res.status(422).send({error: err.message});
});
x.listen(process.env.PORT || 4000, ()=>{
    console.log("Now listening for requests...");
});