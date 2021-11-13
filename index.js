const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b4chv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri);

async function run() {
	try {
		await client.connect();
		console.log('database connected successfully');
		const database = client.db('lipsticGallery');
		const ratingsCollection = database.collection('ratings');
		const lipsticksCollection = database.collection('lipsticks');

		// get API
		app.get('/ratings', async (req, res) => {
			const cursor = ratingsCollection.find({});
			const ratings = await cursor.toArray();
			res.send(ratings);
		});

		// post API
		app.post('/ratings', async (req, res) => {
			const rating = req.body;
			console.log('hit the post api', rating);
			const result = await ratingsCollection.insertOne(rating);
			console.log(result);
			res.json(result);
		});

		// Add lipsticks API
		app.get('/lipsticks', async (req, res) => {
			const cursor = lipsticksCollection.find({});
			const lipsticks = await cursor.toArray();
			res.send(lipsticks);
		});

		app.post('/lipsticks', async (req, res) => {
			const lipstick = req.body;
			console.log('hit the post api', lipstick);

			const result = await lipsticksCollection.insertOne(lipstick);
			console.log(result);
			res.json(result);
		});

		// Add Order API
		app.post('/order', async (req, res) => {
			const order = req.body;
			console.log('order', order);
			res.send('order processed');
			const result = await orderCollection.insertOne(order);
			res.json(result);
		});

		// DELETE API
		app.delete('/lipsticks/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await lipsticksCollection.deleteOne(query);
			res.json(result);
		});
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Hello !');
});

app.listen(port, () => {
	console.log(`listening at ${port}`);
});
