import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const MONGO_URL = process.env.MONGO_URL;
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meet App</title>
        <meta
          name="description"
          content="Brwose a huge list of highly active Meet app"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
