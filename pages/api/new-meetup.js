import { MongoClient } from "mongodb";
//  /api/new-meetup
//POST /api/new-meet-up

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://admin-aya1506:Taiyou0127@cluster0.emooi.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted." });
  }
}
export default handler;
