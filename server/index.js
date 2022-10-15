require("dotenv").config()
const express = require('express');
const sequelize = require("./db/index");
const AuthRouter = require("./routers/authRouter")

const app = express();

app.use(require("cors")())
app.use(express.json());
app.use("/auth/", AuthRouter);

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync( );
        console.log('Connection has been established successfully.');

        app.listen(80, () => console.log("Server started"))
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main().then(r => {})
