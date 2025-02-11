import connectDB from "@/_config/connect";
import liveSessionModel from "@/_models/liveSessions";
import { NextResponse } from "next/server";

export const GET = async () => {
    connectDB();
    try {
        const data = await liveSessionModel.find({ status: 1 });
        if (!data) {
            return NextResponse.json({ message: "Unable to get data!", status: 0 });
        }
        return NextResponse.json({ message: "Data get successfully.", status: 1,data:data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error.", status: 0 });
    }
}