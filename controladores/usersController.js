let usersController = {
    register: function (req, res) {
        return res.render('register')
    },

    login: function (req, res) {
        return res.render('login')
    },

    editarPerfil: function (req,res) {
        return res.render('profile-edit')
    }
};

module.exports = usersController
