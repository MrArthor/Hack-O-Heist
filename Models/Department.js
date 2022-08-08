const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Doctor = require("./Doctor");
const ImageSchema = new Schema({
    Url: String,
    FileName: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});
const DepartmentSchema = new Schema({
    DepartmentName: String,
    PhoneNumber: Number,
    Email: String,
    HOD: String,
    Username: String,
    DepartmentDetails: String,
    Images: [ImageSchema],
    DepartmentDetails: String,
    Doctors: [{
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
})
module.exports = mongoose.model("Department", DepartmentSchema);