const db = require("../models");
const User = db.user;

checkDuplicateEmail = async (req, res, next) => {
  try {
    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! User is already in use!"
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Email!"
    });
  }
};

const verifySignUp = {
  checkDuplicateEmail
};
module.exports = verifySignUp;