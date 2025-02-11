import courseModel from "@/_models/courseModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import connectDB from "@/_config/connect";
import slugformatter from "@/_helper/backend/slugformatter";

export const POST = async (request) => {
    connectDB();
    try {
        const data = await request.formData();

        const courseCategory = data.get("courseCategory");
        const courseName = data.get("courseName");
        const courseSlug = data.get("courseSlug");
        const courseLevel = data.get("courseLevel");
        const courseImage = data.get("courseImage");
        const actualPrice = data.get("actualPrice");
        const discount = data.get("discount");
        const priceAfterDiscount = data.get("priceAfterDiscount");
        const courseVideoLink = data.get("courseVideoLink");
        const courseDesc = data.get("courseDesc");
        const certificateImage = data.get("certificateImage");
        const examAndCertiDesc = data.get("examAndCertiDesc");
        const caseStudyDesc = data.get("caseStudyDesc");
        const title = data.get("title");
        const keywords = data.get("keywords");
        const metaDescription = data.get("metaDescription");

        if (!courseCategory || !courseName || !courseSlug || !courseLevel) {
            return NextResponse.json({ message: "Please fill all the required fields", status: 0 });
        }

        const formattedSlug = slugformatter(courseSlug);

        const isExist = await courseModel.findOne({ courseSlug: formattedSlug });
        if (isExist) {
            return NextResponse.json({ message: "Course already exist.", status: 0 });
        }

        let courseImagePath;
        if (courseImage != "undefined") {
            const courseImageByteData = await courseImage.arrayBuffer();
            const courseImageBuffer = Buffer.from(courseImageByteData);
            courseImagePath = `${Date.now()}-${courseImage.name}`
            await writeFile(`./public/uploads/${courseImagePath}`, courseImageBuffer);
        }

        let certificateImagePath;
        if (certificateImage != "undefined") {
            const certificateImageByteData = await certificateImage.arrayBuffer();
            const certificateImageBuffer = Buffer.from(certificateImageByteData);
            certificateImagePath = `${Date.now()}-${certificateImage.name}`
            await writeFile(`./public/uploads/${certificateImagePath}`, certificateImageBuffer);
        }

        const course = new courseModel({ courseCategory, courseName, courseSlug: formattedSlug, courseLevel, courseImage: courseImagePath || null, actualPrice, discount, priceAfterDiscount, courseVideoLink, courseDesc, certificateImage: certificateImagePath || null, examAndCertiDesc, caseStudyDesc, title, keywords, metaDescription });
        await course.save();
        return NextResponse.json({ message: "Course created successfully...", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error", status: 0 });
    }
}