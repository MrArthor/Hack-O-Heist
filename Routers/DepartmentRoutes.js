const express = require('express');
const Department = require('../Models/Department');
const DoctorRoutes = require('./DoctorRoutes');
const { cloudinary } = require('../cloudinary');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Doctors = require('../Models/Doctor')
const router = express.Router();
const { IsLoggedIn } = require('../Middleware/index')
router.route('/AddDepartment')
    .get(IsLoggedIn, catchAsync(async(req, res) => {
        res.render("Departments/AddDepartment")
    }))
    .post(IsLoggedIn, upload.array('Images'), catchAsync(async(req, res) => {
        const Departments = new Department(req.body.Department);
        await Departments.save();
        res.render("Departments/index", { Departments })
    }))

router.get('/', IsLoggedIn, catchAsync(async(req, res) => {
    const Departments = await Department.find({});
    res.render("Departments/index", { Departments });
}))

router.get("/new", IsLoggedIn, catchAsync(async(req, res) => {
    res.render("Departments/AddDepartment")
}))

router.get("/:id", IsLoggedIn, catchAsync(async(req, res) => {
    const Departments = await Department.findById(req.params.id).populate('Doctors');
    res.render("Departments/DepartmentDetails", { Departments })
}))

router.route('/:id/EditDepartment')
    .get(IsLoggedIn, catchAsync(async(req, res) => {
        const Departments = await Department.findById(req.params.id);
        res.render('Departments/EditDepartment', { Departments })
    }))

router.put("/:id/EditDepartment", IsLoggedIn, catchAsync(async(req, res) => {
    const { id } = req.params;
    const Departments = await Department.findByIdAndUpdate(id, {...req.body.DeleteDepartment });
    await Departments.save();
    res.redirect('/', )
}));

router.get("/:id/AddEmployee", IsLoggedIn, catchAsync(async(req, res) => {
    const Id = req.params.id;
    res.render("Departments/AddEmployee", { Id })
}))
router.use('/:Department/Doctor', DoctorRoutes)

module.exports = router;