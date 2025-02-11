import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    phoneNumber: {
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

const userModel = mongoose.models.userModel || new mongoose.model("userModel", userSchema);
export default userModel;
