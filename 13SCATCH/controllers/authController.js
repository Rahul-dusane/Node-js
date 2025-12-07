const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");


module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;   // remember to use the joy base validation here .

        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You Already Have An Account .");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("user Created Sucessfully");
                }
            });
        });

    } catch (err) {
        res.send(err.message);
    }

}

module.exports.loginUser = async function (req, res) {

    try {
        let { email, password } = req.body;
        console.log(email,password);

        let user = await userModel.findOne({ email: email });
        if (!user) return res.sent("Email or Password Incorrect..");

        bcrypt.compare(password, user.password, function(err, result) {
            if(err) throw err;

            if(result){
                let token = generateToken(user);
                res.cookie("token",token);
                res.redirect("/shop");
            }else{
                res.status(401).send("user login failed ..");
            }
        });
    } catch (err) {
        res.send(err);
    }
}

module.exports.logout = async function (req, res) {
    res.cookie("token","");
    res.render("index.ejs");
}