import mongoose from "mongoose";

const subTopicSchema = new mongoose.Schema({
    courseId: {
        type: String,
        default: null
    },
    chapterId: {
        type: String,
        default: null
    },
    topicId: {
        type: String,
        default: null
    },
    subTopicName: {
        type: String,
        default: null
    },
    subTopicImage: {
        type: String,
        default: null
    },
    subTopicVideo: {
        type: String,
        default: null
    },
    subTopicDescription: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
})

const subTopicModel = mongoose.models.subTopicModel || new mongoose.model("subTopicModel", subTopicSchema);
export default subTopicModel;