import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        default: null
    }
});

const roleModel = mongoose.models.roleModel || new mongoose.model("roleModel", roleSchema);
export default roleModel;