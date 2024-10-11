const {Client} = require("pg");

const SQL = `
CREATE TABLE username (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 30 ) 
);
CREATE TABLE message (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR(600), 
    user_id INT,
    added DATE,
    FOREIGN KEY (user_id) REFERENCES username(id)
);

INSERT INTO username (username) VALUES ('Fede'), ('Nico'), ('Fabri');
INSERT INTO message (text, user_id, added) VALUES ('Hello, Nico!', 1, CURRENT_DATE);
INSERT INTO message (text, user_id, added) VALUES ('Hello, Fede!', 2, CURRENT_DATE);
INSERT INTO message (text, user_id, added) VALUES ('What are you doing', 3, CURRENT_DATE);
`;


async function main (){
    console.log("seeding..");
    const client = new Client({
        connectionString: "postgresql://postgres:1234@localhost:5432/chat",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();