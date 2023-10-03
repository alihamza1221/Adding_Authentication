const {datatype} = require('sequelize');
const sequelize  = require('./databaseMySql/registrationform');

const User = sequelize.define({
    username :{
        type : datatype.STRING,
        allowNull : false
    },
    password:{
        type: datatype.STRING,
        allowNull : false
    },

})

module.exports = User;