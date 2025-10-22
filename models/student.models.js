const mongoose = require("mongoose")

const StudentSchema = mongoose.Schema({
    studentRegistrationNumber: Number,
    studentId: String,
    name: String,
    fatherGuardianName: String,
    class: String,
    emergencyContact: Number,
    studentProfileImgUrl: String

})

const Student = mongoose.model("Student", StudentSchema);
module.export = Student;