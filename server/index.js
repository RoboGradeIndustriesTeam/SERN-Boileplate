const express = require('express');
const sequelize = require("./db/index");
const AuthRouter = require("./routers/authRouter")
const TodoRouter = require("./routers/todoRouter")

const app = express();

app.use(require("cors")())
app.use(express.json());
app.use("/auth/", AuthRouter);
app.use("/todo/", TodoRouter);

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync( );
        console.log('Connection has been established successfully.');

        // let test = sequelize.User.build({username: "1"});
        // test.setPassword("11")
        // console.log(test.password, test.comparePassword("11"), test.comparePassword("1"))
        // await test.save()
        // console.log(test.id)
        // console.log(test.generateToken())
        // sequelize.User.findByToken(test.generateToken()).then(r => console.log(r.id))

        app.listen(80, () => console.log("Server started"))
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main().then(r => {})
