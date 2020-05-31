const express = require('express');
var router = express.Router();
const usrx = require('../models/usr');

router.get('/user',(req,res)=>{
    console.log("Recieved a GET request...");
    usrx.aggregate().near({
    near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    maxDistance: 100000,
    spherical: true,
    distanceField: 'dist.calculated',
    
    }).then(function (dat) {
        res.send(dat);
    });
    
});

router.post('/user',(req,res,next)=>{
    console.log("Recieved a POST request...");
    // var usrx = new usrx(req.body);
    // userx.save(); OR 
    usrx.create(req.body).then((dat)=>{ // returns a promise, create is a mongooose method
        res.send(dat);
    }).catch(next); // catch(next) leads to middleware used below routes in usr_loc becouse otherwise the error is ignored 
   
});

router.put('/user/:id',(req,res,next)=>{
    console.log("Recieved a PUT request...");
    usrx.findByIdAndUpdate({_id: req.params.id}, req.body,{ new: true, useFindAndModify: false }).then((dat)=>{
            res.send(dat); // Pay attention to the third parameter in above arguement list 
    }).catch(next);
});

router.delete('/user/:id',(req,res,next)=>{
    console.log("Recieved a DELETE request...");
    usrx.findByIdAndDelete({_id: req.params.id},{useFindAndModify: false }).then((dat)=>{
        res.send(dat);
    });

});

module.exports = router;