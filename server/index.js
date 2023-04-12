const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = 3000

const member = require('./member')
const train_station = require('./train_station')
const trains = require('./trains')
const available_train = require('./available_train')
const ticket = require('./ticket')
const seat = require('./seat')

app.get('/api', (request, response) => {
	response.send('Hello')
})

app.post('/api/db/create/register', (request, response) => {
	let form = request.body
	let data = {
		username: form.username || '',
		password: form.password || '',
		first_name: form.first_name || '',
		last_name: form.last_name || '',
		identity_number: form.identity_number || 0,
		email: form.email || ''
	}

	member.create(data, err => {
		if (!err) {
			console.log('document saved')
			response.send(true)
		} else {
			console.log(err)
			response.send(false)
		}
	})
})

app.post('/api/db/create/ticket', (request, response) => {
	const data = request.body;
	ticket.create(data, err => {
		if (!err) {
			console.log('document saved');
		} else {
			console.log(err);
			response.send(false);
		}
	});
	response.send(true);
});



app.post('/api/db/create/seat', (request, response) => {
	const seatObject = request.body;
	for (let i = 0; i < seatObject.seat_num.length; i++) {
			const data = {
				seat_date: seatObject.seat_date,
				seat_num: seatObject.seat_num[i],
				available_train_name: seatObject.available_train_name,
			};
			seat.create(data, err => {
				if (!err) {
					console.log('document saved');
				} else {
					console.log(err);
					response.send(false);
				}
			});
		}
	response.send(true);
});

app.get('/api/db/read/seat', (request, response) => {
	seat
		.find({ seat_date: { $eq: request.query.date }, available_train_name: { $eq: request.query.avaliable_train_name } })
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.get('/api/db/read/ticket', (request, response) => {
	ticket
		.find({ username: { $eq: request.query.username }})
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.get('/api/db/read/ticket_id', (request, response) => {
	ticket
		.find({ _id: { $eq: request.query._id }})
		// .find({ username: { $eq: request.query.username }})
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.get('/api/db/read/pass_ticket', (request, response) => {
	ticket
		.find({ username: { $eq: request.query.username },bill_status:{$eq: 'passed'}})
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.get('/api/db/read/train_station', (request, response) => {
	train_station
		.find()
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.get('/api/db/read/trains', (request, response) => {
	trains
		.find({ origin: { $eq: request.query.origin }, destination: { $eq: request.query.destination } })
		.exec((err, docs) => {
			response.json(docs)
		})
})
app.get('/api/db/read/member', (request, response) => {
	member
		.find({ username: { $eq: request.query.username }, password: { $eq: request.query.password } })
		.exec((err, docs) => {
			response.json(docs)
		})
})
app.get('/api/db/read/available_train', (request, response) => {
	available_train
		.find({ train_no: { $eq: request.query.train_no } })
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.post('/api/db/update', (request, response) => {
	let form = request.body
	let data = {
		name: form.name || '',
		price: form.price || 0,
		detail: form.detail || '',
		date_added: new Date(Date.parse(form.date_added)) || new Date(),
	}

	member
		.findByIdAndUpdate(form._id, data, { useFindAndModify: false })
		.exec(err => {
			if (err) {
				response.json({ error: err })
				return
			}
		})
	//หลังการอัปเดต ก็อ่านข้อมูลอีกครั้ง แล้วส่งไปแสดงผลที่ฝั่งโลคอลแทนข้อมูลเดิม
	//member.find().exec((err, docs) => { response.json(docs) })
	response.json({})
})

app.post('/api/db/delete', (request, response) => {
	let _id = request.body._id
	member
		.findByIdAndDelete(_id, { useFindAndModify: false })
		.exec(err => {
			if (err) {
				response.json({ error: err })
				return
			}
		})

	response.json({})
})

app.get('/api/db/paginate', (request, response) => {
	let options = {
		page: request.query.page || 1,     //เพจปัจจุบัน
		limit: 2     //แสดงผลหน้าละ 2 รายการ เพราะข้อมูลที่ใช้ทดสอบมีไม่มาก               
	}

	member
		.paginate({}, options, (err, result) => {
			response.json(result)	//result จะมีทั้งผลลัพธ์และข้อมูลเกี่ยวกับเพจ
		})
})

app.get('/api/db/search', (request, response) => {
	let q = request.query.q || ''

	//กรณีนี้ให้กำหนด pattern ด้วย RegExp แทนการใช้ / /
	let pattern = new RegExp(q, 'ig')

	//จะค้นหาจากฟิลด์ name และ detail
	let conditions = {
		$or: [
			{ name: { $regex: pattern } },
			{ detail: { $regex: pattern } }
		]
	}

	let options = {
		page: request.query.page || 1,     //เพจปัจจุบัน
		limit: 2     //แสดงผลหน้าละ 2 รายการ (ข้อมูลมีน้อย)               
	}

	member.paginate(conditions, options, (err, result) => {
		response.json(result)
	})
})
app.post("/api/login", async (request, response) => {
	try {
		const { username, password } = request.body;
		await client.connect();
		const db = client.db();
		const collection = db.collection("users");
		const user = await collection.findOne({ username, password });
		if (user) {
			response.json({ success: true });
		} else {
			response.json({ success: false });
		}
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: "Server error" });
	} finally {
		await client.close();
	}
});

app.listen(port, () => {
	console.log('Server listening on port ' + port)
})
//-----------------------------------------------tar-----------------------------------------------------------------------
app.get('/api/db/read/admintrains', (request, response) => {
	trains
		.find()
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.post('/api/db/create/addtrains', (request, response) => {
	let form = request.body
	let data = {
		train_no: form.train_no || '',
		origin: form.origin || '',
		destination: form.destination || '',
		departure_time: form.departure_time || '',
		type: form.type || '',
		arrival_time: form.arrival_time || ''
	}

	trains.create(data, err => {
		if (!err) {
			console.log('document saved')
			response.send(true)
		} else {
			console.log(err)
			response.send(false)
		}
	})
})
app.post('/api/db/delete/deltrains', (request, response) => {
	let _id = request.body._id
	trains
		.findByIdAndDelete(_id, { useFindAndModify: false })
		.exec(err => {
			if (err) {
				response.json({ error: err })
				return
			}
		})

	response.json({})
})
//--------------------------station----------------------------

app.post('/api/db/create/train_station', (request, response) => {
	let form = request.body
	let data = {
		station_name: form.station_name || '',

	}

	train_station.create(data, err => {
		if (!err) {
			console.log('document saved')
			response.send(true)
		} else {
			console.log(err)
			response.send(false)
		}
	})
})
app.post('/api/db/delete/train_station', (request, response) => {
	let _id = request.body._id
	train_station
		.findByIdAndDelete(_id, { useFindAndModify: false })
		.exec(err => {
			if (err) {
				response.json({ error: err })
				return
			}
		})

	response.json({})
})
//-----------------------avatrain-----------------------------------
app.get('/api/db/read/train_for105', (request, response) => {
	trains
		.find()
		.exec((err, docs) => {
			response.json(docs)
		})
})
app.get('/api/db/read/avatrain_for105', (request, response) => {
	available_train
		.find()
		.exec((err, docs) => {
			response.json(docs)
		})
})
app.post('/api/db/create/avatrain', (request, response) => {
	let form = request.body
	let data = {
		avaliable_train_name: form.avaliable_train_name || '',
		avaliable_train_type: form.avaliable_train_type || '',
		avaliable_train_class: form.avaliable_train_class || '',
		avaliable_train_price: form.avaliable_train_price || '',
		train_no: form.train_no || '',

	}

	available_train.create(data, err => {
		if (!err) {
			console.log('document saved')
			response.send(true)
		} else {
			console.log(err)
			response.send(false)
		}
	})
})
app.post('/api/db/delete/avatrain', (request, response) => {
	let _id = request.body._id
	available_train
		.findByIdAndDelete(_id, { useFindAndModify: false })
		.exec(err => {
			if (err) {
				response.json({ error: err })
				return
			}
		})

	response.json({})
})

//   app.listen(port, () => {
// 	console.log(`Server listening at http://localhost:${port}`);
//   });...


app.get('/api/db/read/ticketall', (request, response) => {
	ticket
		.find()
		.exec((err, docs) => {
			response.json(docs)
		})
})

app.post('/api/db/updatestatus', (request, response) => {
	let form = request.body
	let data = {
		bill_status:'passed', 
	}
	
	ticket
	.findByIdAndUpdate(form._id, data, { useFindAndModify: false })
	.exec(err => {
		if (err) {
			response.json({error: err})
			return
		}
	})	
	
	response.json({})
})


