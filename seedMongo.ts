import { MongoClient } from 'mongodb';
import { initialPortfolioData } from './src/data/initialData';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

async function seed() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('Portfolio');
  
  console.log('Clearing old data...');
  await db.collection('projects').deleteMany({});
  await db.collection('publications').deleteMany({});
  await db.collection('events').deleteMany({});
  await db.collection('achievements').deleteMany({});
  await db.collection('certificates').deleteMany({});
  
  console.log('Inserting new projects...');
  if (initialPortfolioData.projects.length) {
    const projectsToInsert = initialPortfolioData.projects.map(({ _id, ...rest }) => rest);
    await db.collection('projects').insertMany(projectsToInsert);
  }
  
  console.log('Inserting new publications...');
  if (initialPortfolioData.publications.length) {
    const pubsToInsert = initialPortfolioData.publications.map(({ _id, ...rest }) => rest);
    await db.collection('publications').insertMany(pubsToInsert);
  }
  
  console.log('Inserting new events & certificates...');
  if (initialPortfolioData.events.length) {
    const events = initialPortfolioData.events.filter(e => e.category === 'events');
    const certs = initialPortfolioData.events.filter(e => e.category !== 'events');
    
    if (events.length) {
      const eventsToInsert = events.map(({ _id, ...rest }) => rest);
      await db.collection('events').insertMany(eventsToInsert);
      await db.collection('achievements').insertMany(eventsToInsert);
    }
    if (certs.length) {
      await db.collection('certificates').insertMany(certs.map(({ _id, ...rest }) => rest));
    }
  }

  console.log('Data successfully seeded to MongoDB!');
  await client.close();
}

seed().catch(console.error);
