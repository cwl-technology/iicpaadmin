import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    courseId: {
        type: String,
        default: null
    },
    chapterName: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
})

const chapterModel = mongoose.models.chapterModel || new mongoose.model("chapterModel", chapterSchema);
export default chapterModel;