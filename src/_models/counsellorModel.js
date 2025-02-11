import mongoose from "mongoose";

const counsellorSchema = new mongoose.Schema({
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

const counsellorModel = mongoose.models.counsellorModel || new mongoose.model("counsellorModel", counsellorSchema);
export default counsellorModel;
