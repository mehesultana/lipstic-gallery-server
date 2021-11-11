const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
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

		// post API
		app.post('/ratings', async (req, res) => {
			console.log('hit the post api');

			// const rating = req.body;
			// console.log('hit the post api', rating);

			// const result = await ratingsCollection.insertOne(rating);
			// console.log(result);
			// res.json(result);
			res.send('post');
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
