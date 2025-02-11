import connectDB from "@/_config/connect";
import liveSessionModel from "@/_models/liveSessions";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id, courseId, date, startTime, endTime, description } = await request.json();
        if (!courseId || !date || !startTime || !endTime || !description) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = await liveSessionModel.findByIdAndUpdate({ _id: id }, { courseId, date, startTime, endTime, description });
        if (!data) {
            return NextResponse.json({ message: "Unable to update data", status: 0 });
        }
        return NextResponse.json({ message: "Session updated successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error.", status: 0 });
    }
}