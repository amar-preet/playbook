var Playbooks = require('../models/playbooks');
var logger = require('../common/logger');
var Playbookitems = require('../models/playbookitems');
//var Users = require('../models/users');

/* Export exposed functions */
module.exports = function () {

  module.createPlaybookitem = function (data, callback) {
    // find the playbook via id
    Playbooks.findById(data.pbid, function (err, playbook) {
      if (err) {
        logger.error(err);
        callback({
          success: false,
          message: err
        });
        return;
      }
      else if (!playbook) {
        logger.error('playbook not found with id: ' + data.pbid);
        callback({
          success: false,
          message: 'playbook not found with id: ' + data.pbid
        });
        return;
      }
      /*
        if the playbook exists, create a new playbook item, then save it as
        an embedded document and push it into the playbook
      */
      var pbitem = new Playbookitems(data);
      playbook.items.push(pbitem);
      playbook.save(function (err) {
        if (err) {
          logger.error(err);
          callback({
            success: false,
            message: err
          });
        }
        callback({
          success: true,
          message: playbook.items,
        });
      });

    });
  }

  module.deletePlaybookitem = function (playbookid, playbookitemid, callback) {
    Playbooks.findById(playbookid, function (err, playbook) {
      if (err) {
        logger.error(err);
        callback({
          success: false,
          message: err
        });
        return;
      }
      else if (!playbook) {
        logger.error('playbook not found with id: ' + playbookid);
        callback({
          success: false,
          message: 'playbook not found with id: ' + playbookid
        });
        return;
      }

      var index = -1;
      for (var i = 0; i < playbook.items.length; i++) {
        if (playbook.items[i]._id == playbookitemid) {
          index = i;
        }
      }

      var itemsChanged = false;
      if (index > -1) {
        var itemCountBefore = playbook.items.length;
        var result = playbook.items.splice(index, 1);
        var itemCountAfter = playbook.items.length;
        if (itemCountBefore != itemCountAfter) {
          itemsChanged = true;
        }
      }

      if (!itemsChanged) {
        callback({
          success: false,
          message: 'item not deleted'
        });
        return;
      }

      playbook.save();
      logger.debug('pbitem: ' + playbookitemid + ' removed from pb: ' + playbookid);
      callback({
        success: true,
        message: playbook.items
      });
    });
  }

  module.updatePlaybookItem = function (playbookid, playbookitemid, data, callback) {

    Playbooks.findById(playbookid, function (err, playbook) {
      if (err) {
        logger.error(err);
        callback({
          success: false,
          message: err
        });
        return;
      }
      else if (!playbook) {
        logger.error('playbook not found with id: ' + playbookid);
        callback({
          success: false,
          message: 'playbook not found with id: ' + playbookid
        });
        return;
      }

      var index = -1;
      var itemsID = 0;
      logger.debug('Total playbooks', playbook.items.length)
      for (var i = 0; i < playbook.items.length; i++) {
        if (playbook.items[i]._id == playbookitemid) {
          index = i;

          itemsID = playbook.items[i]._id;
          logger.debug('playbookitemid', playbookitemid);
          logger.debug('INDEX', index);          
          logger.debug('  data.id', data._id);
          logger.debug('data.taskPriority', data.taskPriority);

          //playbook.items.set(index, data.callback )
          playbook.items[index].name = data.name;
          playbook.items[index].taskPriority = data.taskPriority;
          playbook.items[index]._id = playbookitemid;
          playbook.items[index].description = data.description;
          playbook.items[index].fullDescription = data.fullDescription;
          playbook.items[index].createdBy = data.createdBy;
          playbook.items[index].whoOwns = data.whoOwns;
          //playbook.items.set(index, data)
          logger.debug(' before save', playbook.items[index].name, ' ', playbook.items[index].taskPriority);

           playbook.save(function (err) {
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
              message: playbook.items
            });
            return;
          });            
        }
      }
    });
  }

  return module;
};
