const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')	

mongoose.connect('mongodb://localhost/appDB', {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch(err => console.log(err))

let memberSchema = new mongoose.Schema({
	username: String,
	password: String,
	first_name: String,
	last_name: String,
	identity_number: Number,
	email: String
})

memberSchema.plugin(paginate)	
let member = mongoose.model('member', memberSchema)		
module.exports = member
