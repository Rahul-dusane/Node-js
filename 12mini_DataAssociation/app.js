const express = require("express");
const app = express();
const userModel = require("./models/user");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("./models/post");
const user = require("./models/user");
const crypto = require("crypto");
// const multer = require("multer");
// const multerconfig = require("./config/multerconfig");
const upload = require("./config/multerconfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/uploads')
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(12,function(err,bytes){
//         const fn = bytes.toString('hex') + path.extname(file.originalname);
//         cb(null, fn)
//     })    
   
//   }
// })

// const upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.post("/register", async function (req, res) {
    let { email, password, name, username, age } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User Already Register...");

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let createdUser = await userModel.create({
                username,
                email,
                name,
                age,
                password: hash
            });

            let token = jwt.sign({ email: email, userid: createdUser._id }, "secrate");
            res.cookie("token", token);
            res.send("User Registered..");
        });
    });

});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("User Not Found...");

    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) return res.status(500).send("Wrong Password...");

        let token = jwt.sign({ email: email,userid:user._id }, "secrate_key_For_Login");
        res.cookie("token", token);

        res.send("User Login");
    });

});

app.get("/logout", isLogeedIn, function (req, res) {
    res.cookie("token", "");
    res.send("User Logout");
});

function isLogeedIn(req, res, next) {
    try {
        if (req.cookies.token === "") return res.redirect("/login");
        else {
            let data = jwt.verify(req.cookies.token, "secrate_key_For_Login");
            req.user = data;
        }
    } catch (err) {
        console.log(err);
    }
    next();
}

app.get("/profile", isLogeedIn, async function (req, res) {
    
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("posts");
        console.log(user);
        res.render("profile.ejs", { user });
    } catch (err) {
        console.log("error: ",err);
        res.status(500).redirect("/login");
    }

});

app.post("/post", isLogeedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content: content
    });

    console.log(post);

    user.posts.push(post._id);
    await user.save();
    res.status(200).redirect("/profile");

});

app.get("/like/:id", isLogeedIn, async function (req, res) {
    
    try {
        let post = await postModel.findOne({ _id: req.params.id }).populate("user");
        
        if(post.likes.indexOf(req.user.userid) === -1){
            post.likes.push(req.user.userid);
        }else{
            post.likes.splice(post.likes.indexOf(req.user.userid));
        }

        await post.save();
        res.redirect("/profile",{user});
        
    } catch (err) {
        console.log(err);
        res.status(500).redirect("/profile");
    }

});

app.get("/edit/:id", isLogeedIn, async function (req, res) {
    
    try {
        let post = await postModel.findOne({ _id: req.params.id }).populate("user");
        
       res.render("edit.ejs",{post});
        
    } catch (err) {
        console.log(err);
        // res.status(500).redirect("/profile");
    }

});

app.post("/update/:id", isLogeedIn, async function (req, res) {
    
    try {
       
        let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content: req.body.content});
        res.redirect("/profile");
        
    } catch (err) {
        console.log(err);
        // res.status(500).redirect("/profile");
    }

});

app.get("/profile/upload", function (req, res) {
    res.render("profileupload.ejs");
});

app.post("/upload", isLogeedIn,upload.single("image") ,async function (req, res) {
   let user = await userModel.findOne({email:req.user.email});
   user.profilepic = req.file.filename;
   await user.save();
   res.redirect("/profile");
});

// app.get("/test", function (req, res) {
//     res.render("test.ejs");
// });

// app.post("/upload", upload.single("image") ,function (req, res) {
//     console.log(req.file);
// });

app.listen(3000);