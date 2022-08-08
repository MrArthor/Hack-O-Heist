const passport = require('passport');
const Users = require('../Models/User');

module.exports.RegisterRender = (req, res) => {
    res.render("Users/Register");
}
module.exports.NewUser = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        //   console.log(email, Username, password);
        const User = new Users({ email, username });
        const registeredUser = await Users.register(User, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('Success', 'Welcome to HMS!');
            res.redirect('/Departments');
        })
    } catch (e) {
        req.flash('Error', e.message);
        console.log(e.message);
        res.redirect('register');
    }
}

module.exports.LoginRender = (req, res) => {
    res.render('Users/login');
}

module.exports.LoginCredentials = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    //.log(redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.Logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }

    req.flash('success', "Goodbye!");
    res.redirect('/');
    });
}