var mongoose=require('mongoose');
var Schema =mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
 username: {type:String, required:true},
 password: {type:String, required:true}
});

// validate password against hash
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);
