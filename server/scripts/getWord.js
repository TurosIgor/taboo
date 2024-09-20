import Word from "../models/Word.js";
import env from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../")
env.config({path: path.join(rootDir, '.env')})

async function getRandomWord(req) {
    console.log(req.session.sentItems)
    const words = await Word.aggregate([
        { $match: { _id: { $nin: req.session.sentItems } } },
        { $sample: { size: 1 } }
    ]);
    if(req.session.sentItems.includes(words[0]._id.toString())) {
        return getRandomWord(req);
    }

    return words[0];
}

async function markWordAsSent(req, id) {
    req.session.sentItems.push(id);
}

async function isWordSent(req, id) {
    return req.session.sentItems.includes(id);
}

export default async function getWordToSend(req) {
    const randomWord = await getRandomWord(req);

    const isSent = await isWordSent(req, randomWord._id.toString())
    if(!isSent) {
        markWordAsSent(req, randomWord._id.toString());
        return randomWord;
    }
    return null;
}