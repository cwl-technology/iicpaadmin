import connectDB from "@/_config/connect";
import topicModel from "@/_models/topicModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { courseId, chapterId, topicName } = await request.json();
        if (!courseId || !chapterId || !topicName) {
            return NextResponse.json({ message: "Please fill all the fields!", status: 0 })
        }
        const data = new topicModel({ courseId, chapterId, topicName });
        await data.save();
        return NextResponse.json({ message: "Created successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}