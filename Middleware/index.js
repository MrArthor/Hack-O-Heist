const Department = require("../Models/Department");
const ExpressError = require("../utils/ExpressError");
const Doctor = require("../Models/Doctor")
    //")
    //const { DoctorSchema, reviewSchema } = require("../schemas.js");
module.exports.IsLoggedIn = (req, res, next) => {
    //   return next();
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.IsAuthorized = async(req, res, next) => {
    const { id } = req.params;
    const User = await User.findById(req.params.id);
    if (!User.Author._id.equals(req.user._id)) {
        req.flash('error', "You Are Not Allowed To Do This");
        return res.redirect(`/Doctors/${id}`);
    }
    next();
}

// module.exports.ValidateDoctor = (req, res, next) => {
//     const { error } = DoctorSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(msg, 400);
//     } else {
//         next();
//     }
// };

// module.exports.ValidateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }
// module.exports.ReviewIsAuthorized = async(req, res, next) => {
//     const { id, reviewId } = req.params;
//     const review = await Reviews.findById(reviewId);
//     if (!review.Author.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that!');
//         return res.redirect(`/Doctors/${id}`);
//     }
//     next();
// }