import express from "express";
import cors from "cors";
import fs from "fs/promises";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/upload", async (req, res) => {
    const img = req.body.data.img;
    const base64Data = img.replace(/^data:image\/png;base64,/, "");
    var fileName = createFileName();
    await fs.writeFile(`./public/store/${fileName}.png`, base64Data, "base64");
    return res.status(200).send(`${fileName}.png`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

function createFileName() {
    return new Date()
        .toJSON()
        .replace(/:/g, "")
        .replace(/\./g, "")
        .replace(/-/g, "");
}
