const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { replicationStart } = require("pg-protocol/dist/messages");
const router = new Router();
require("dotenv").config();

router.post("/checkUser", async (req, resp) => {
  try {
    const token = req.headers.authorization;
    user=jwt.verify(token, process.env.jwtSecret)
    if (!user) {
      return resp.status("401").json({ message: "Ошибка авторизации" });
    }
    return resp.json({ isAuth: true });
  } catch (e) {
    return resp.status("401").json({ message: "Ошибка авторизации1" })
  }
});
router.post("/save-user-info", async (req, resp) => {});
router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина 6 символов").isLength({ min: 6 }),
  ],
  async (req, resp) => {
    try {
      const errors = validationResult(req.body.data);
      if (!errors.isEmpty()) {
        resp.status(500).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }
      const { password, email } = req.body.data;
      const candidate = await User.findOne({ email: email }).exec();
      if (candidate) {
        return resp.status(400).json("Пользователь существует");
      }
      const hashPassword = await bcrypt.hash(password, process.env.hashPassword);
      const user = new User({ email, password: hashPassword, role:'user' });
      user.save();
      return resp.status(200).json({ message: "Success" });
    } catch (error) {
      resp.status(500).json({ message: "Error..." });
    }
  }
);
router.post("/getEmail", async (req, resp) => {
  console.log("asfsafas");
  const user = await User.findOne(req.body).exec();

  if (!user) {
    return resp
      .status(200)
      .json({ message: "Данный email не зарегистрирован", isUnique: true });
  }
  return resp
    .status(200)
    .json({ message: "Данный email зарегистрирован", isUnique: false });
});
router.post(
  "/login",
  [
    check("email", "Некорректный email").normalizeEmail().isEmail(),
    check("password", "Некорректный пароль").exists(),
  ],
  async (req, resp) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(500).json({
          errors: errors.array(),
          message: "Некорректные данные",
        });
      }
      const user = await User.findOne({ email }).exec();
      if (!user) {
        return resp.status(500).json({ message: "Некорректный email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return resp.status(500).json({ message: "Некорректный пароль" });
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.jwtSecret,
        {
          expiresIn: "12h",
        }
      );
      console.log(token);
      resp.json({
        token,
        userId: user.id,
        email: user.email,
        role:user.role
      });
    } catch (error) {
      resp.status(500).json({ message: "Error..." });
    }
  }
);
module.exports = router;
