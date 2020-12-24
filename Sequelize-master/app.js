const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/user")
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login/home", async (req, res) => {

    res
        .status(200)
        .sendFile(path.join(__dirname, "public/html", "login.html"));
})

app.get("/", async (req, res) => {

    res
        .status(200)
        .sendFile(path.join(__dirname, "public/html", "login.html"));
})

// simple route
app.get("/user", async (req, res) => {
    User.findAll({})
    .then((user) => {
        res.json(user);
    })
    .catch((error) => {
        res.json({ error: error });
    })
});

app.post("/user", async (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.json({ error: error });
        })

});

app.put("/user/:task_name", async (req, res) => {

    User.update(
        // Set Attribute values 
        { task_name: req.body.task_name },
        // Where clause / criteria 
        { where: { task_name: req.params.task_name } }

    ).then(user => {
        res.json(user);
    }).catch(err => {
        res.send(err)
    })

});

app.delete("/user/:task_name", async (req, res) => {
    User.destroy({ where: { task_name: req.params.task_name } }).then(user => {
        res.json(user);
    }).catch(err => {
        res.send(err)
    })

});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});