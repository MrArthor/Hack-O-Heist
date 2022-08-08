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
    const Doc = await Doctor.find({});
    await Patient.deleteMany({});

    for (let i = 0; i < 10; i++) {

        const random1000 = Math.floor(Math.random() * 10);
        const random100 = Math.floor(Math.random() * 10);

        const Patients = new Patient({
            FirstName: `${Data[random1000].FirstName}`,
            LastName: `${Data[random1000].LastName}`,
            Images: {
                Url: 'https://res.cloudinary.com/mrarthor/image/upload/v1659966046/HospitalManagement/iStock_UnderstandingPatientDataLaunchesToday_201704006_1200x1200_taaomo.png',
                FileName: 'HospitalManagement/iStock_UnderstandingPatientDataLaunchesToday_201704006_1200x1200_taaomo.png'
            },
            Documents: [{
                Url: 'https://res.cloudinary.com/mrarthor/image/upload/v1659965124/HospitalManagement/fgqcewar5rmutjg5wdvj.png',
                FileName: 'HospitalManagement/fgqcewar5rmutjg5wdvj.png'
            }],
            Doctor: `${Doc[random100]._id}`

        });
        await Patients.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});