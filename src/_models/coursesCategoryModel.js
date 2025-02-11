import mongoose from "mongoose";

const courseCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        default: null
    },
    categorySlug: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
})

const courseCategoryModel = mongoose.models.courseCategoryModel || new mongoose.model("courseCategoryModel", courseCategorySchema);
export default courseCategoryModel;