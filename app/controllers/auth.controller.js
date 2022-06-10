const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Member =db.member;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      password: bcrypt.hashSync(req.body.password, 8),
      confirm_password: bcrypt.hashSync(req.body.confirm_password, 8),
    });

     res.status(200).send({ message: "Congratulation you've registered" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Email Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Email or Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
   
    req.session.token = token;
    return res.status(200).send({
      status_code: 200,
      message : "Success Login",
      data  : {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        access_token: token
      }
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};

exports.member = async (req, res) => {
  try {
      var reqBody = req.body;
      reqBody.forEach(element => {
        if(element.details[0].balance < 10000){
          Member.create({
            _id: element._id,
            name: element.details[0].name,
            balance: element.details[0].balance,
            transportation: element.favoriteTransportation
          });
        }
      });
      return res.status(200).send({message: "data has been inserted"});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};