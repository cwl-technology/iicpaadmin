import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    },

})

const adminModel = mongoose.models.adminModel || new mongoose.model("adminModel", adminSchema);
export default adminModel;
