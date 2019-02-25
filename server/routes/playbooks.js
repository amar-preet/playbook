var express = require('express');
var router = express.Router();
var playbookController = require('../controllers/playbook-controller')();

/* GET playbook listing. */
router.get('/', function (req, res, next) {
  playbookController.getAll(function(payload) {
    res.json(payload);
  });
});


/* GET playbook listing by id */
router.get('/:pbId', function (req, res, next) {
    var id = req.params.pbId;
    playbookController.getPlaybookById(id, function(payload) {
      res.json(payload);
    });
});

/* Update playbook listing by id */
router.put('/:pbId', function (req, res, next) {
    var id = req.params.pbId;
    playbookController.updatePlaybook(id, req.body, function(payload) {
      res.json(payload);
    });
});


/* Post a new playbook */
router.post('/', function (req, res, next) {
  playbookController.createPlaybook(req.body, function(payload) {
    res.json(payload);
  });
});


 router.delete('/:pbId', function(req, res, next){
   var id = req.params.pbId;

   playbookController.deletePlaybook(id, function(payload) {
     res.json(payload);
   });
 })

module.exports = router;
