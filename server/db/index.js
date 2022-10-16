const {Sequelize} = require('sequelize');
const {DataTypes} = require("sequelize");
const bcrpyt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// -------- USER --------
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    family_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vkId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {});
User.findByToken = async function (token) {
    try {
        let payload = jsonwebtoken.decode(token)
        return await User.findOne({
            where: {
                id: payload.id
            }
        })
    }
    catch (e) {
        return null
    }

}
User.prototype.setPassword = function (new_password) {
    this.password = bcrpyt.hashSync(new_password, bcrpyt.genSaltSync());
}
User.prototype.comparePassword = function (password) {
    return bcrpyt.compareSync(password, this.password)
}
User.prototype.generateToken = function () {
    return jsonwebtoken.sign({
        id: this.id
    }, process.env.SECRET || "Secret")
}
// -------- USER --------

module.exports = sequelize;
module.exports.User = User;
