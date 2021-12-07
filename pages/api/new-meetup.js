import { MongoClient } from "mongodb";
//  /api/new-meetup
//POST /api/new-meet-up

const MONGO_URL = process.env.MONGO_URL;

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted." });
  }
}
export default handler;
