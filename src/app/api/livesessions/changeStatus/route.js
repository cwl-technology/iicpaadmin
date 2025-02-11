import connectDB from "@/_config/connect";
import liveSessionModel from "@/_models/liveSessions";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id, status } = await request.json();
       
        const data = await liveSessionModel.findByIdAndUpdate({ _id: id }, { status: status == 0 ? 1 : 0 });
        if (!data) {
            return NextResponse.json({ message: "Unable to change status", status: 0 });
        }
        return NextResponse.json({ message: "Status changed.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error.", status: 0 });
    }
}