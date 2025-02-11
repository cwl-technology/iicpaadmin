import connectDB from "@/_config/connect";
import subSyllabusModel from "@/_models/topicModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id, courseId, chapterId, topicName } = await request.json();
        if (!id || !courseId || !chapterId || !topicName) {
            return NextResponse.json({ message: "Please provide all the fields!", status: 0 })
        }
        const data = await subSyllabusModel.findByIdAndUpdate({ _id: id }, { courseId, chapterId, topicName });
        if (!data) {
            return NextResponse.json({ message: "Unable to update!", status: 0 });
        }
        return NextResponse.json({ message: "Updated successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}