import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Path to the backup JSON file (adjust if needed)
const backupFilePath = path.resolve('syeed_asif_portfolio_backup_2026-08-16.json');
if (!fs.existsSync(backupFilePath)) {
  console.error(`Backup file not found at ${backupFilePath}`);
  process.exit(1);
}

const backupData = JSON.parse(fs.readFileSync(backupFilePath, 'utf-8'));
// Expected structure: same as PortfolioData

async function migrate() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('Portfolio');

    // Helper to insert array of items without _id
    const insertItems = async (collectionName: string, items: any[]) => {
      if (!items?.length) return;
      const docs = items.map(({ _id, ...rest }) => rest);
      await db.collection(collectionName).deleteMany({}); // clear old data
      await db.collection(collectionName).insertMany(docs);
      console.log(`Inserted ${docs.length} documents into ${collectionName}`);
    };

    // Clear and insert core collections
    await insertItems('projects', backupData.projects);
    await insertItems('publications', backupData.publications);
    await insertItems('experience', backupData.experience);

    // Events and certificates are stored together in the original seed script
    const events = (backupData.events || []).filter((e: any) => e.category === 'events');
    const certificates = (backupData.events || []).filter((e: any) => e.category !== 'events');
    await insertItems('events', events);
    await insertItems('certificates', certificates);
    await insertItems('achievements', events); // achievements share same shape

    // Config collection – we store the whole config object
    const configCollection = db.collection('config');
    await configCollection.deleteMany({});
    const config = backupData.config || {};
    const { theme, hero, about, cv, sections, skillCategories, adminEmail, adminPin } = config;
    await configCollection.insertOne({
      theme: theme || {},
      hero: hero || {},
      about: about || {},
      cv: cv || {},
      sections: sections || [],
      skillCategories: skillCategories || [],
      adminEmail: adminEmail || '',
      adminPin: adminPin || ''
    });
    console.log('Config data migrated');

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.close();
  }
}

migrate().catch(console.error);
