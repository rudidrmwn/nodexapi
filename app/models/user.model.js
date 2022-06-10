const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("users", {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    confirm_password: {
      type: Sequelize.STRING
    }
  });
  return User;
};