const path = require('node:path');
const express = require('express');
const chatRouter = require('./routes/chatRouter');

const app = express();
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", chatRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening of ${PORT}`));