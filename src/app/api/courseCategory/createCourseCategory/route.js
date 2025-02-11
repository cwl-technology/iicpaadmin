import connectDB from "@/_config/connect";
import slugformatter from "@/_helper/backend/slugformatter";
import courseCategoryModel from "@/_models/coursesCategoryModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const { categoryName, categorySlug } = await request.json();
        if (!categoryName || !categorySlug) {
            return NextResponse.json({ message: "Please fill all the fields", status: 0 });
        }

        const formattedSlug = slugformatter(categorySlug);
      
        const isCategoryExist = await courseCategoryModel.findOne({ categorySlug: formattedSlug });
        if (isCategoryExist) {
            return NextResponse.json({ message: "Category already exist", status: 0 });
        }
        const data = new courseCategoryModel({ categoryName, categorySlug: formattedSlug });
        await data.save();
        return NextResponse.json({ message: "Course category created successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}