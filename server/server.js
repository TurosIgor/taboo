import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import env from 'dotenv'
import getWordToSend from './scripts/getWord.js'
import initializeSession from './middlewares/initializeSession.js'
import mongoose from 'mongoose'

env.config();

const app = express();

mongoose.connect(process.env.MONGO_URI);

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 60 * 60,
    autoRemove: 'native',
    collectionName: 'sessions'
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));
app.use(express.json());
app.use(initializeSession);

app.get("/api/words", async (req, res) => {
    try {
        const  data  = await fs.readFile("./taboo.json", "utf8")
        const {words} = JSON.parse(data)
        console.log(words)
        res.send(words)
    } catch(err) {
        console.err(err)
        res.status(500)
    }
})

app.get("/api/v2/end", (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.error("Error destroying session:", err);
        }
        res.send("Session ended successfully.");
    });
})

app.get("/api/v2/word", async (req, res) => {
    try {
        const word = await getWordToSend(req);
        console.log(word);
        if(word) {
            res.send(word)
        } else {
            res.status(404).send("No unsent words available.");
        }
    } catch(err) {
        console.error(err)
        res.status(500)
    }
})

app.listen(3000, () => console.log(`Server started on port 3000`));