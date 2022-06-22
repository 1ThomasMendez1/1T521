const db = require("../database/models");
const user = db.User

/* requiero el modulo bcryptjs */
//const bcryptjs = require("bcryptjs");

const userController = {
    login : (req, res) => {
        return res.render("login");
    },
};