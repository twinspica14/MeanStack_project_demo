var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema =new Schema({
 
  title:{type: String, 
    required: true},
 
  paragraph:{type: String, 
    required: true},
   usr:{type: String},
   author:{type: String}
});


BlogSchema.pre('save', function(next) {
  var user = this;
 next();
});


module.exports = mongoose.model("Blog", BlogSchema);

