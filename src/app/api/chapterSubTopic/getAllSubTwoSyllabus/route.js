import connectDB from "@/_config/connect";
import subTwoSyllabusModel from "@/_models/subTopicModel";
import { NextResponse } from "next/server";

export const GET = async () => {
    connectDB();
    try {
        const data = await subTwoSyllabusModel.find({});
        if (!data) {
            return NextResponse.json({ message: "Unable to get data", status: 0 });
        }
        return NextResponse.json({ message: "Get syllabus data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}