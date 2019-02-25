var Playbooks = require('../models/playbooks');
var logger = require('../common/logger');

/* Export exposed functions */
module.exports = function() {

  module.getAll = function(callback) {
    logger.debug('get all playbooks');
    Playbooks.find(function (err, playbooks) {
        if(err) {
          logger.error(err);
          callback({
            success: false,
            message: err
          })
          return;
        }
        callback({
          success: true,
          message: playbooks
        });       
    });     
  }

  module.getPlaybookById = function(id, callback) {
    logger.debug('get playbook by id');
    Playbooks.findById(id, function (err, playbook) {
      if(err) {
        logger.error(err);
        callback({
          success: false,
          message: err
        })
        return;
      }
	  else {
		logger.debug(JSON.stringify(playbook));
	  }
      callback({
        success: true,
        message: playbook
      });
    });
  }

  module.updatePlaybook = function(id, data, callback) {
    Playbooks.findById(id, function (err, playbook) {
      if(err) {
        logger.error(err);
        callback({
          success: false,
          message: err
        })
        return;
      }    
      playbook.title = data.title;
      playbook.favorite = data.favorite;
      playbook.required = data.required;
      playbook.priority = data.priority;
      playbook.status = data.status;
      playbook.save(function(err) {
        if (err) {
          logger.error(err);
          callback({
            success: false,
            message: err
          })
          return;
        }
        logger.debug('playbook successfully updated');
        callback({
          success: true,
          message: playbook
        });
      });

    });
  };

  module.createPlaybook = function(data, callback) {
    var pb = new Playbooks(data);
    pb.save(function (err) {
        if (err) {
          logger.error(err);
            callback({
              success: false,
              error: err
            });
        } else {
          logger.debug('playbook created: ' + pb);
            callback({
              success: true,
              message: pb
            });
        }
    })
  }

  module.deletePlaybook = function(id, callback) {
    logger.debug('get playbook by id');
    Playbooks.findByIdAndRemove(id, function(err) {
      if(err) {
        logger.error(err);
        callback({
          success: false,
          message: err
        })
        return;
      }
      logger.debug('Playbook deleted, id=' + id);
      callback({
        success: true,
        message: 'Playbook deleted, id=' + id
      })
    });
  }

  return module;
};