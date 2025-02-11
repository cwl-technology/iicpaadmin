import connectDB from "@/_config/connect";
import topicModel from "@/_models/topicModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { id } = await request.json();

        const data = await topicModel.findOne({ _id: id });
        if (!data) {
            return NextResponse.json({ message: "Unable to update!", status: 0 });
        }
        return NextResponse.json({ message: "Updated successfully.", status: 1,data:data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}