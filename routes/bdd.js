var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://dev:azerty@cluster0.btwct.mongodb.net/weatherapp?retryWrites=true&w=majority', 
      options,         
      function(err) {
          if (err){
            console.log(err);
          } else {
            console.log('Connection à la base de données réussi');
          }
       
      }
   );

   
 
 

//  module.exports = weatherModel;