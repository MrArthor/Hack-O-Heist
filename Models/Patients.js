const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    Url: String,
    FileName: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.Url.replace('/upload', '/upload/w_200');
});
const PatientSchema = new Schema({
    FirstName: String,
    LastName: String,
    DepartmentName: String,
    DOB: Number,
    PhoneNumber: Number,
    Gender: String,
    Images: [ImageSchema],
    Documents: [ImageSchema],
    Doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },

});

module.exports = mongoose.model("Patient", PatientSchema);