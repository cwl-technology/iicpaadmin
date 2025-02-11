import connectDB from "@/_config/connect";
import subTwoSyllabusModel from "@/_models/subTopicModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id, courseId, syllabusId, subSyllabusId, heading } = await request.json();
        if (!id || !courseId || !heading || !syllabusId || !subSyllabusId) {
            return NextResponse.json({ message: "Please provide all the fields!", status: 0 })
        }
        const data = await subTwoSyllabusModel.findByIdAndUpdate({ _id: id }, { courseId, syllabusId, subSyllabusId, heading });
        if (!data) {
            return NextResponse.json({ message: "Unable to update!", status: 0 });
        }
        return NextResponse.json({ message: "Updated successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}