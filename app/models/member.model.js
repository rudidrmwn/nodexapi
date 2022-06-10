const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Member = sequelize.define("members", {
    _id:{
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    balance:{
      type: Sequelize.BIGINT
    },
    transportation: {
      type: Sequelize.STRING
    },
  });
  return Member;
};