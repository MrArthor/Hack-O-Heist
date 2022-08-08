const express = require('express');
const DoctorSchema = require('../Models/Doctor')
const Department = require('../Models/Department')
const Patients = require('../Models/Patients')
const router = express.Router({ mergeParams: true });
const PatientRoutes = require('./PatientRoutes');
const { IsLoggedIn } = require("../Middleware/index")

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

router.get("/", IsLoggedIn, catchAsync(async(req, res, next) => {
    res.render("Doctor/Doctor");
}))
router.get("/AddPatient", IsLoggedIn, catchAsync(async(req, res) => {
    res.render("Doctor/AddPatient");
}))
router.get("/EditEmployee", IsLoggedIn, (req, res, next) => {

    res.render("Doctor/EditEmployee")
})
router.get("/:DoctorId", IsLoggedIn, catchAsync(async(req, res) => {
    const Doctor = await DoctorSchema.findById(req.params.DoctorId).populate('Department').populate('Patients').populate('Images');
    console.log(Doctor.Images.Url);
    res.render("Doctor/Doctor", { Doctor })

}))
router.post('/AddDoctor', IsLoggedIn, catchAsync(async(req, res) => {
    const Departments = await Department.findById(req.params.Department);
    const Doctor = new DoctorSchema(req.body.Doctor);
    await Doctor.save();

    Doctor.Department = Departments
    Departments.Doctors.push(Doctor)
    await Doctor.save();
    await Departments.save();
    res.redirect(`/Departments/${Departments._id}/Doctor/${Doctor._id}`)
}))

router.use('/:DocId/Patient', PatientRoutes)

module.exports = router;