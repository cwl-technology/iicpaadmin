import connectDB from "@/_config/connect";
import courseModel from "@/_models/courseModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id } = await request.json();
        const data = await courseModel.findOne({ _id: id });
        if (!data) {
            return NextResponse.json({ message: "Unable to get course data", status: 0 });
        }
        return NextResponse.json({ message: "Get course data successfully...", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}