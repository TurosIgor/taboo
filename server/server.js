import express from "express"
import fs from "fs/promises"

const app = express();
app.use(express.json());

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

app.listen(3000, () => console.log(`Server started on port 3000`));