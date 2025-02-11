import connectDB from "@/_config/connect";
import courseModel from "@/_models/courseModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    connectDB();
    try {
        const data = await courseModel.find({ status: 1 });
        if (!data) {
            return NextResponse.json({ message: "Unable to find course data", status: 0 });
        }
        return NextResponse.json({ message: "Get course data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", staus: 0 });
    }
}