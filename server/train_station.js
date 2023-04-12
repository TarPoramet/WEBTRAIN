const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')	

mongoose.connect('mongodb://localhost/appDB', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

let train_stationrSchema = new mongoose.Schema({
	station_name: String,
})

train_stationrSchema.plugin(paginate)	
let train_station = mongoose.model('train_station', train_stationrSchema)		
module.exports = train_station
