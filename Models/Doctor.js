const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require('passport-local-mongoose');
const ImageSchema = new Schema({
    Url: String,
    FileName: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});
const DoctorSchema = new Schema({
    FirstName: String,
    LastName: String,
    DepartmentName: String,
    JobTitle: String,
    DOB: String,
    PhoneNumber: Number,
    Email: String,
    Gender: String,
    Username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Images: [ImageSchema],

    Department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    Patients: [{
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }],


});
DoctorSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("Doctor", DoctorSchema);