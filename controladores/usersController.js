
const db = require('../database/models')
const productos = db.Producto
const users = db.User
const comments = db.Comment
const userFollowers = db.UserFollower
const op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');
const { dirname } = require('path');

const usersController = {
    register: function (req,res){
        if (req.session.user){
            res.redirect("/index" )
        }
        return res.render('register');
    },
    login : function(req,res) {
        if (req.session.user){
            res.redirect("/index" )
        }
        return res.render('login');
    }
}


module.exports = usersController;