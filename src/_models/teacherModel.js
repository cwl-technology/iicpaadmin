import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    }
})

const teacherModel = mongoose.models.teacherModel || new mongoose.model("teacherModel", teacherSchema);
export default teacherModel;
