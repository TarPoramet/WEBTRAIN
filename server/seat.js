const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

mongoose.connect('mongodb://localhost/appDB', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

let seatSchema = new mongoose.Schema({
    seat_date: String,
    seat_num: String,
    available_train_name: String,
})

seatSchema.plugin(paginate)
let seats = mongoose.model('seats', seatSchema)
module.exports = seats
