const express = require('express');

const DoctorSchema = require('../Models/Doctor');
const Departments = require('../Models/Department');
const PatientSchema = require('../Models/Patients');
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const { IsLoggedIn } = require("../Middleware/index")

const router = express.Router({ mergeParams: true });

router.get('/', IsLoggedIn, catchAsync(async(req, res) => {
    const { Department, DocId } = req.params;
    res.render('Patients/AddPatient', { Department, DocId });
}));
router.get('/:PatientId', IsLoggedIn, catchAsync(async(req, res) => {
    const Patient = await PatientSchema.findById(req.params.PatientId).populate('Doctor').populate('Images');
    res.render('Patients/Patient', { Patient })
}));

router.get('/:PatientId/AddFiles', IsLoggedIn, catchAsync(async(req, res) => {
    const Patient = await PatientSchema.findById(req.params.PatientId).populate({
        path: 'Doctor',
        populate: { path: 'Department' }
    });
    //   res.send(Patient)
    res.render('Patients/AddFiles', { Patient })
        //  res.send(Patient)
}));


router.put('/:PatientId/AddFiles', IsLoggedIn, upload.array('Images'), catchAsync(async(req, res) => {
    const { PatientId } = req.params;
    const Patient = await PatientSchema.findById(PatientId).populate('Doctor').populate('Images');
    const imgs = req.files.map(f => ({ Url: f.path, FileName: f.filename }));
    console.log(imgs);
    Patient.Documents.push(...imgs);
    await Patient.save();
    res.render('Patients/Patient', { Patient })
        // res.send(Patient)
}))
router.get('*', catchAsync(async(req, res) => {

    const Doctor = await DoctorSchema.findById(req.params.DocId).populate('Patients')

    res.send(Doctor)
}));
router.get('/AddPatients', IsLoggedIn, catchAsync(async(req, res) => {
    const { Department, DocId } = req.params;
    res.render('Patients/AddPatient', { Department, DocId })
}));
router.post('/AddPatients', catchAsync(async(req, res) => {
    const Patient = new PatientSchema(req.body.Patient);
    const Doctor = await DoctorSchema.findById(req.params.DocId).populate('Department').populate('Patients').populate('Images');
    Patient.Doctor = Doctor;
    Doctor.Patients.push(Patient);
    await Patient.save();
    await Doctor.save();
    res.render('/Doctor/Doctor', { Doctor });
    // res.send(Patient);

}));
router.post("/:id/Feedback", catchAsync(async(req, res) => {
    const Patients = await PatientSchema.findById(req.params.id);
    Patients.Review = (req.body.Review);
    await Patients.save();
    console.log(Patients);

}))


// router.delete('/:reviewId', IsLoggedIn, ReviewIsAuthorized, catchAsync(ReviewController.DeleteReviews));

module.exports = router;