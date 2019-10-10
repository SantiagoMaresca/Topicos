const mongoose = require('mongoose');
const DATABASE_URL = 'mongodb://localhost:27017/cambioNelson'


module.exports =() =>{
  mongoose.connect(DATABASE_URL, {userNewUrlParser: true})
  .then(()=> console.log('Mongo connected on '+DATABASE_URL))
  .catch(err => console.log('Connection has error '+err))

  /*process.on('SIGINT', ()=>{
      mongoose.connection.close(()=>{
          console.log('Mongo is disconnected');
      })
  })*/
}