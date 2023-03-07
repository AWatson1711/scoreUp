const bcrypt = require("bcrypt");

module.exports = (app, User) => {
  app.post("/user", (req, res) => {
    try {
      const regExp = {
        email: /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/,
        number:
          /((?:\+|00)[17](?: |-)?|(?:\+|00)[1-9]\d{0,2}(?: |-)?|(?:\+|00)1-\d{3}(?: |-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |-)[0-9]{3}(?: |-)[0-9]{4})|([0-9]{7}))/,
        password:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10000}$/,
      };
      const password = req.body.password;
      const email = req.body.email;
      const name = req.body.name;
      const number = req.body.number;
      const firstname = req.body.firstname;
      const regexIsOk = (regexp, value) => regexp.test(value);
      User.findOne({ where: { email } }).then((element) => {
        if (element) {
          return res
            .status(409)
            .json({ message: "un compte existe déjà avec cet email" });
        }
        if (!regexIsOk(regExp.email, email)) {
          return res.status(409).json({ message: "email non coforme" });
        }
        // if (!regexIsOk(regExp.number, number)) {
        //   return res.status(409).json({ message: "number non coforme" });
        // }
        if (!regexIsOk(regExp.password, password)) {
          return res.status(409).json({ message: "password non coforme" });
        }
        bcrypt.hash(password, 10).then((hash) => {
          User.create({
            email: email,
            password: hash,
            name: name,
            firstname: firstname,
            role_id: 1,
          }).then((element) => {
            res.json({
              message: `User ${name} ${firstname} ajouté avec succes`,
              data: element,
            });
          });
        });
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
};
