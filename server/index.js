require("dotenv").config()
const express = require('express');
const sequelize = require("./db/index");
const AuthRouter = require("./routers/authRouter")
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require("@adminjs/sequelize");

const app = express();
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
})

const admin = new AdminJS({
    resources: [
        {
            resource: sequelize.User,
            options: {
                listProperties: ["id", "username", "family_name"],
                showProperties: ["id", "username", "family_name"],
                editProperties: ["id", "username", "family_name"],
                filterProperties: ["id", "username", "family_name"],
            }
        }
    ],
    branding: {
        companyName: 'Hackathon',
        logo: "https://avatars.githubusercontent.com/u/80571676?s=75&v=4",
        softwareBrothers: false
    },
})
const adminRouter = AdminJSExpress.buildRouter(admin)

app.use(require("cors")())
app.use(express.json());
app.use(admin.options.rootPath, adminRouter)
app.use("/auth/", AuthRouter);

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync( );
        console.log('Connection has been established successfully.');

        app.listen(3000, () => console.log("Server started"))
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main().then(r => {})
