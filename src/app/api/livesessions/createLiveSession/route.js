import connectDB from "@/_config/connect";
import liveSessionModel from "@/_models/liveSessions";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { courseId, date, startTime, endTime, description } = await request.json();
        if (!courseId || !date || !startTime || !endTime || !description) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = new liveSessionModel({ courseId, date, startTime, endTime, description });
        await data.save();
        return NextResponse.json({ message: "Session created successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error.", status: 0 });
    }
}