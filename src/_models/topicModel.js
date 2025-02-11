import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    courseId: {
        type: String,
        default: null
    },
    chapterId: {
        type: String,
        default: null
    },
    topicName: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
})

const topicModel = mongoose.models.topicModel || new mongoose.model("topicModel", topicSchema);
export default topicModel;