const mongoose = require('mongoose');
const Data = require('./Data');
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
    await Department.deleteMany({});
    for (let i = 0; i < 10; i++) {


        const random1000 = Math.floor(Math.random() * 10);
        const price = Math.floor(Math.random() * 20) + 100;
        const Dept = new Department({
            DepartmentName: 'Random Department ',
            Username: `${Data[random1000].Username}`,
            HOD: `${Data[random1000].Username}`,
            Email: `${Data[random1000].Email}`,
            Images: [{
                Url: 'https://res.cloudinary.com/mrarthor/image/upload/v1658058996/YelpCamp/doctor-career-information-526008-edit-6d1c0fe2c1ea46fd801f8a8f804763ab_jekhbm.jpg',
                FileName: 'YelpCamp/evwwpnpimhkzxetbwh9r'
                
                
            }],
            PhoneNumber: `${Data[random1000].PhoneNumber}`,
            DepartmentDetails: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.   ",
        });
        await Dept.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});