// require your server and launch it
const express = require("express");
const server = express();

const port = 9000;

server.listen(() => {
    console.log(`Listening on Port ${port}`);
})