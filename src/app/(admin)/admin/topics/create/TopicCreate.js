"use client"

import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useCallback } from "react";


const TopicCreate = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");
    const chapterId = searchParams.get("chapterId");



    const onSubmit = async (data) => {
        try {
            data.courseId = courseId;
            data.chapterId = chapterId;
            const res = await axios.post("/api/chapterTopic/createTopic", data);
         
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push(`/admin/topics?${searchParams.toString()}`);
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
                            create topic
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
                                                    Topic Name
                                                </label>
                                                <input {...register("topicName",
                                                    { required: { value: true, message: "Topic name is required!" } }
                                                )}
                                                    className={`form-control ${errors.topicName ? "border-danger" : ""}`}
                                                    type="text"
                                                    placeholder="Enter the topic name"
                                                />
                                                {
                                                    errors.topicName && <p className="text-danger">{errors.topicName.message}</p>
                                                }
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

export default TopicCreate