import connectDB from "@/_config/connect";
import chapterModel from "@/_models/chapterModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { courseId, chapterName } = await request.json();
        if (!courseId || !chapterName) {
            return NextResponse.json({ message: "Please fill all the fields!", status: 0 })
        }
        const data = new chapterModel({ courseId, chapterName });
        await data.save();
        return NextResponse.json({ message: "Created successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}