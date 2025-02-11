import connectDB from "@/_config/connect";
import courseCategoryModel from "@/_models/coursesCategoryModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { status, id } = await request.json();
        const data = await courseCategoryModel.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 });
        if (!data) {
            return NextResponse.json({ message: "Unable to change status.", status: 0 });
        }
        return NextResponse.json({ message: "Status changed.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}