var express = require('express');
var router = express.Router();
var Playbooks = require('../models/playbooks');

/!* GET users listing. *!/
router.get('/', function(req, res, next){
    var playbook=new Playbooks({title:"Month End Close", favorite:true, items:[]});
    
    playbook.save(function(err) {
        if (err) {
            res.send(err.errors);
        }else{
            res.json({message: 'playbook created!'});
        }
    })
});

/*var Users = require('../models/users');

/!* GET users listing. *!/
router.get('/', function(req, res, next){
    var newuser=new Users({name:'cole'});
    newuser.save(function(err) {
        if (err) {
            res.send(err.errors);
        }else{
            res.json({message: 'user created!'});
        }
    })
});*/

module.exports = router;