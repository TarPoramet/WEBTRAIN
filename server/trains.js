const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

mongoose.connect('mongodb://localhost/appDB', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

let trainsSchema = new mongoose.Schema({
    train_no: String,
    origin: String,
    destination: String,
    departure_time: String,
    arrival_time: String,
    type: String
})

trainsSchema.plugin(paginate)
let trains = mongoose.model('trains', trainsSchema)
module.exports = trains
