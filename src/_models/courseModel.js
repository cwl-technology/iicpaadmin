import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseCategory: {
        type: String,
        default: null
    },
    courseName: {
        type: String,
        default: null
    },
    courseSlug: {
        type: String,
        default: null
    },
    courseLevel: {
        type: String,
        default: null
    },
    courseImage: {
        type: String,
        default: null
    },
    actualPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    priceAfterDiscount: {
        type: Number,
        default: 0
    },
    courseVideoLink: {
        type: String,
        default: null
    },
    courseDesc: {
        type: String,
        default: null
    },
    certificateImage: {
        type: String,
        default: null
    },
    examAndCertiDesc: {
        type: String,
        default: null
    },
    caseStudyDesc: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    keywords: {
        type: String,
        default: null
    },
    metaDescription: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }

})

const courseModel = mongoose.models.courseModel || new mongoose.model("courseModel", courseSchema);
export default courseModel;
