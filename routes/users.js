const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");


// POST a new create  
router.post('/register', (req, res, next) => {

  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const user = new User({
      username,
      password: hash
    })

    const promise = user.save();

    promise.then(data => res.json(data))
      .catch(err => res.json(err));
  })



});

router.post("/authenticate", (req, res) => {

  const {username, password} = req.body;

  User.findOne({username}, (err, user) => {
    if(err) 
      throw err;
    if(!user) {
        res.json({
          status: "Topilmadi",
          message: "Kirish muvaffaqiyatsiz, faqat admin kirish mumkin"
        })
    }
    else{
      bcrypt.compare(password, user.password).then(result => {
        if(!result) {
          res.json({
            status: "Topilmadi",
            message: "Parolingiz xato"
          })
        }
        else{
          const payload = { username }

          // const token = jwt.sign(payload, req.app.get("api_secret_key"), {
          //   expiresIn: 720 // 12 soat iwledi i kiyn uladi
          // })

          const token = jwt.sign(payload, req.app.get("api_secret_key"))

          res.json({
            status: true,
            token
          })
        }
      })
    }
  })

})

module.exports = router;
