const mongoose = require('mongoose');
const Data = require('./Data');
const UserName = require('./Username');
const Doctor = require("../Models/Doctor");
const Department = require("../Models/Department");
const Patient = require("../Models/Patients");

mongoose.connect('mongodb://localhost:27017/HMS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async() => {


    const random1000 = Math.floor(Math.random() * 10);
    const random100 = Math.floor(Math.random() * 10);
    const Doc = await Doctor.find({});
    for (let D of Doc) {
        // console.log(D.Department);
        const Dept = await Department.findById(D.Department)
        Dept.Doctors.push(D);
        await Dept.save();
        //  console.log(Dept);
    }

};

seedDB().then(() => {
    mongoose.connection.close();
});