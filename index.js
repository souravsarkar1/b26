const express = require('express');
const { connection } = require('./db');
require('dotenv').config()
const { userRoutes } = require('./Routes/user.routes');
const { notesRoute } = require('./Routes/notes.routes');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.use("/users", userRoutes);
app.use('/notes', notesRoute);
app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected To DB");
        console.log(`Server is Running at port no. ${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("Something Went to Wrong");
    }
})