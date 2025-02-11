import connectDB from "@/_config/connect";
import courseCategoryModel from "@/_models/coursesCategoryModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    connectDB();
    try {
        const data = await courseCategoryModel.find({ status: 1 });
        if (!data) {
            return NextResponse.json({ message: "Unable to find course category data", status: 0 });
        }
        return NextResponse.json({ message: "Get course category data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", staus: 0 });
    }
}