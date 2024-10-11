const db = require("../db/queries");

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
/*
async function getMessages  (req, res) {
    const searchParam = req.query.search;
    const usernames = await db.getAllUsernames();
    const result = await db.searchBy(searchParam);

    res.send("Usernames: " + usernames.map( user => user.username));
}; */

async function getAllMessages (req, res){
    const messages = await db.getAllMessages();
    console.log("Messages", messages);
    res.render('index', {title: "Messages", messages: messages, links: links});
}

async function getNewMessage (req, res) {
    res.render('form', {links: links});
}

async function postNewMessage (req, res) {
    await db.createNewMessage(req.body.message, req.body.author);
    res.redirect("/");
}

async function getMessageDetail (req, res) {
    const messageId = req.params.id;
    const message = await db.searchMessageDetail(messageId);
    console.log(message);
    
    if(message){
      res.render('messagedetail', {links: links, message: message});
    }else{
      res.status(404).send("Message not found");
    }
  }

module.exports = {
    getAllMessages,
    getNewMessage,
    postNewMessage,
    getMessageDetail,
}
