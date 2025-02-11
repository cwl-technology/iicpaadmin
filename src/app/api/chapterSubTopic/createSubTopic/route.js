import connectDB from "@/_config/connect";
import subTopicModel from "@/_models/subTopicModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    connectDB();
    try {
        const formdata = await request.formData();

        const courseId = formdata.get("courseId");
        const chapterId = formdata.get("chapterId");
        const topicId = formdata.get("topicId");
        const subTopicName = formdata.get("subTopicName");
        const subTopicImage = formdata.get("subTopicImage");
        const subTopicVideo = formdata.get("subTopicVideo");
        const subTopicDescription = formdata.get("subTopicDescription");

        console.log(subTopicImage);
        console.log(subTopicVideo);
        if (!courseId || !chapterId || !topicId || !subTopicName) {
            return NextResponse.json({ message: "Please fill all the fields!", status: 0 })
        }

        let subTopicImagePath;
        if (subTopicImage) {
            const subTopicImageByteData = await subTopicImage.arrayBuffer();
            const subTopicImageBuffer = Buffer.from(subTopicImageByteData);
            subTopicImagePath = `${Date.now()}-${subTopicName.name}`
            await writeFile(`./public/uploads/${subTopicImagePath}`, subTopicImageBuffer);
        }

        let subTopicVideoPath;
        if (subTopicVideo) {
            const subTopicVideoByteData = await subTopicVideo.arrayBuffer();
            const subTopicVideoBuffer = Buffer.from(subTopicVideoByteData);
            subTopicVideoPath = `${Date.now()}-${subTopicVideo.name}`
            await writeFile(`./public/uploads/${subTopicVideoPath}`, subTopicVideoBuffer);
        }


        const data = new subTopicModel({ courseId, chapterId, topicId, subTopicName, subTopicImage: subTopicImagePath || null, subTopicVideo: subTopicVideoPath || null, subTopicDescription });
        await data.save();
        return NextResponse.json({ message: "Created successfully.", status: 1 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error!", status: 0 });
    }
}