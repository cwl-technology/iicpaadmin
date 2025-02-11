import mongoose from "mongoose";

const permissionsSchema = new mongoose.Schema({
    menuId: {
        type: String,
        default: null
    },
    service_1: {
        type: Number,
        default: 0
    },
    service_2: {
        type: Number,
        default: 0
    },
    service_3: {
        type: Number,
        default: 0
    },
    service_4: {
        type: Number,
        default: 0
    },
    service_5: {
        type: Number,
        default: 0
    },
    roleId: {
        type: String,
        default: null
    },
});

const permissionsModel = mongoose.models.permissionsModel || new mongoose.model("permissionsModel", permissionsSchema);
export default permissionsModel;