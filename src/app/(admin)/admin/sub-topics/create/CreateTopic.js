"use client"

import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

const CreateTopic = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()
    const [subTopicImage, setTopicImage] = useState();

    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");
    const chapterId = searchParams.get("chapterId");
    const topicId = searchParams.get("topicId");

    const editor = useRef(null);
    const [subTopicDescription, setSubTopicDescription] = useState('');

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...',
        height: "300px"
    }),
    );

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append("courseId", courseId);
            formdata.append("chapterId", chapterId);
            formdata.append("topicId",topicId);
            formdata.append("subTopicName", data.subTopicName);
            formdata.append("subTopicImage", data.subTopicImage[0]);
            formdata.append("subTopicVideo", data.subTopicVideo[0]);
            formdata.append("subTopicDescription", subTopicDescription);

            const res = await axios.post("/api/chapterSubTopic/createSubTopic", formdata);
            console.log(res.data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push(`/admin/sub-topics?${searchParams.toString()}`);
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            create Subtopic
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <fieldset className="border rounded p-3 px-4 mb-4">
                                    <legend className="float-none w-auto px-3">
                                        Section
                                    </legend>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Subtopic Name
                                                </label>
                                                <input {...register("subTopicName",
                                                    { required: { value: true, message: "subtopic name is required!" } }
                                                )}
                                                    className={`form-control ${errors.subTopicName ? "border-danger" : ""}`}
                                                    type="text"
                                                    placeholder="Enter the subtopic name"
                                                />
                                                {
                                                    errors.subTopicName && <p className="text-danger">{errors.subTopicName.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Subtopic Image
                                                </label>
                                                <input {...register("subTopicImage")}
                                                    className="form-control"
                                                    type="file"
                                                    placeholder="Enter the subtopic name"
                                                    onChange={(e) => setTopicImage(e.target.files[0])}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center">
                                            {
                                                subTopicImage && <img src={URL.createObjectURL(subTopicImage)} alt="" width={"100px"} />
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Subtopic Video
                                                </label>
                                                <input {...register("subTopicVideo")}
                                                    className="form-control"
                                                    type="file"
                                                    placeholder="Enter the subtopic name"
                                                />

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="position-relative form-group">
                                                <label>
                                                    Subtopic Description
                                                </label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={subTopicDescription}
                                                    config={config}
                                                    tabIndex={1}
                                                    onBlur={newContent => setSubTopicDescription(newContent)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>



                                <button className="mt-2 px-4 btn btn-thm" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTopic