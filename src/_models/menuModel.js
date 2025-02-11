import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    menuName: {
        type: String,
        default: null
    },
    service_1: {
        type: String,
        default: null
    },
    service_2: {
        type: String,
        default: null
    },
    service_3: {
        type: String,
        default: null
    },
    service_4: {
        type: String,
        default: null
    },
    service_5: {
        type: String,
        default: null
    }
});

const menuModel = mongoose.models.menuModel || new mongoose.model("menuModel", menuSchema);
export default menuModel;