var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema =new Schema({
  name:{type: String, 
    required: true,
     unique: true},
  email:{type: String, 
    required: true, 
    unique: true}, 
  password:{type: String, 
    required: true},
  permission:{type : String,
      required: true,
       default:'user' 
    }


});


UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    user.password = hash;
     next();
});
  // do stuff
 
});




UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};
 


module.exports = mongoose.model("User", UserSchema);