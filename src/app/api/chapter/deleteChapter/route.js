import connectDB from "@/_config/connect";
import syllabusModel from "@/_models/chapterModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id } = await request.json();

        const data = await syllabusModel.findByIdAndDelete({ _id: id });
        if (!data) {
            return NextResponse.json({ message: "Unable to delete!", status: 0 });
        }
        return NextResponse.json({ message: "Deleted successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}