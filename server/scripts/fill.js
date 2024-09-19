import mongoose from 'mongoose'
import fs from 'fs/promises'
import Word from '../models/Word.js';
import env from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../")
env.config({path: path.join(rootDir, '.env')})

async function getDataFromJSON() {
    try{
        const data = await fs.readFile(path.join(rootDir, 'taboo.json'), "utf8");
        const { words } = await JSON.parse(data);
        return words;
    } catch(err) {
        console.error(err);
        return [];
    }
}

async function fillDatabase() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to the database!");
    
        const words = await getDataFromJSON();
        console.log(words[0])
        console.log("Inserting data...");
    
        try {
            await Word.deleteMany();
            const savedWords = await Word.insertMany(words);
            console.log(`Successfully created ${savedWords.length} entries.`);
        } catch(err) {
            console.error(err);
        }
    
        await mongoose.disconnect();
        console.log("Disconnected from database.");
    } catch(err) {
        console.error(err);
    }
}

await fillDatabase();