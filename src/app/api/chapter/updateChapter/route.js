import connectDB from "@/_config/connect";
import syllabusModel from "@/_models/chapterModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id, courseId, chapterName } = await request.json();
        if (!id || !courseId || !chapterName) {
            return NextResponse.json({ message: "Please provide all the fields!", status: 0 })
        }
        const data = await syllabusModel.findByIdAndUpdate({ _id: id }, { courseId, chapterName });
        if (!data) {
            return NextResponse.json({ message: "Unable to update!", status: 0 });
        }
        return NextResponse.json({ message: "Updated successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}