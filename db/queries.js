const { user } = require("pg/lib/defaults");
const pool = require("./pool");

async function getAllMessages() {
    const {rows} = await pool.query("SELECT * FROM message");
    return rows;
}

async function createNewMessage(message, username){
    
    const {rows} = await pool.query("SELECT id FROM username WHERE username = $1", [username]);
    await pool.query("INSERT INTO message (text, user_id, added) VALUES ($1, $2, CURRENT_DATE)", [message, rows[0].id]);
}

async function searchMessageDetail(id){
    const {rows} = await pool.query("SELECT m.text, m.added, m.id, u.username from message m JOIN username u ON u.id = m.user_id WHERE m.id= $1", [id])
    return rows[0];
}

module.exports = {
    getAllMessages,
    createNewMessage,
    searchMessageDetail,
}