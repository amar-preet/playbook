var express = require('express');
var router = express.Router();
var playbookitemController = require('../controllers/playbookitem-controller')();

/* Post a new playbook item */
router.post('/', function (req, res, next) {
  playbookitemController.createPlaybookitem(req.body, function(payload) {
    res.json(payload);
  });
});

router.delete('/:playbookid/:playbookitemid', function(req, res, net) {
  playbookitemController.deletePlaybookitem(req.params.playbookid, req.params.playbookitemid, function(payload) {
    res.json(payload);
  });
})

router.put('/:playbookid/:playbookitemid', function (req, res, next) {
  playbookitemController.updatePlaybookItem(req.params.playbookid, req.params.playbookitemid, req.body, function(payload) {
    res.json(payload);
  });
});

module.exports = router;
