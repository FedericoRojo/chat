const path = require('node:path');
const express = require('express');

function generateRandomId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    id: generateRandomId(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    id: generateRandomId()
  }
];

const links = [
{
  href: "/new",
  text: 'New Message'
},
{
  href: "/",
  text: "Home"
}
]

const app = express();
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render('index', {title: "Messages", messages: messages, links: links});
});

app.get("/new", (req, res) => {
    res.render('form', {links: links});
});

app.use(express.urlencoded({ extended: true }));
app.post("/new", (req, res) => {
    messages.push({text: req.body.message, user: req.body.author, added: new Date(), id: generateRandomId()});
    res.redirect("/");
});

app.get('/message/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages.find( elem => elem.id === messageId);

  if(message){
    res.render('messagedetail', {links: links, message: message});
  }else{
    res.status(404).send("Message not found");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening of ${PORT}`));