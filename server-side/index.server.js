/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// enviourment variables
env.config();

const Port = process.env.PORT || 5000;
// middlerwares
app.use(cors());
app.use(express.json());

// routes
const userAuthRoutes = require("./routes/user.auth");
const memeRoutes = require("./routes/memes");

app.use("/api", userAuthRoutes);
app.use("/api", memeRoutes);

// mongodb connection
const connectDB = (dburl) =>
    mongoose
        .connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false,
        })
        .then(() => {
            console.log("Database Connected");
        });

const start = async () => {
    try {
        await connectDB(process.env.dburl);
        app.listen(Port, () => {
            console.log(`Server is running on port ${Port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
