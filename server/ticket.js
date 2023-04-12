const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

mongoose.connect('mongodb://localhost/appDB', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

let ticketSchema = new mongoose.Schema({
    username: String,
    first_name: String,
    last_name: String,
    origin: String,
    destination: String,
    date: String,
    train_no: String,
    departure_time: String,
    arrival_time: String,
    type: String,
    avaliable_train_name: String,
    avaliable_train_class: Number,
    avaliable_train_type: String,
    seatArray: Array,
    total_amount: Number,
    bill_img: String,
    bill_status: String,
})

ticketSchema.plugin(paginate)
let ticket = mongoose.model('tickets', ticketSchema)
module.exports = ticket

