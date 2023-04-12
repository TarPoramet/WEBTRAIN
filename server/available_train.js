const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

mongoose.connect('mongodb://localhost/appDB', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

let available_trainSchema = new mongoose.Schema({
 
        avaliable_train_name: String,
        avaliable_train_class: String,
        avaliable_train_type: String,
        avaliable_train_price: String,
        train_no: String,

})

available_trainSchema .plugin(paginate)
let available_train = mongoose.model('available_trains', available_trainSchema )
module.exports = available_train
