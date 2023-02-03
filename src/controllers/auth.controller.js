const AuthServices = require("../services/auth.services");
const transporter = require("../utils/mailer");

const register = async (req, res, next) => {
  try{
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      res.status(201).json({ message: "user created" });
      await transporter.sendMail({
        to: result.email,
        from: "nievaka31@gmail.com",
        subject: "Email confirmation",
        html: "<h1>¡Bienvenido!</h1><p>Este correo es para confirmar tu email. ¡Ya puedes empezar a elegir tus productos!</p>"
      });
    } else {
      next({ message: "something wrong" });
    };
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email) {
      next({
        error: "Missing data",
        message: "Not email provided"
      });
    }
    if (!password) {
      next({
        error: "Missing data",
        message: "Not password provided"
      });
    }

    const result = await AuthServices.login({ email, password });
    if (result.isValid) {
      const {id, username, email} = result.user;
      const userData = {id, username, email};
      const token = AuthServices.genToken(userData);
      userData.token = token;
      res.json(userData);
      
    } else {
      next({ message: "user not found" });
    }
  } catch (error) {
    next({ message: "something wrong" });
  }
};

module.exports = {
  register,
  login
};