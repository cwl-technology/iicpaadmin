"use client"

import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const TopicEdit = () => {
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");
    const courseName = searchParams.get("courseName");
    const chapterName = searchParams.get("chapterName");
    const chapterId = searchParams.get("chapterId");
    const id = searchParams.get("topicId");

    const createQueryString = (name, value) => {
        const params = new URLSearchParams()
        params.set(name, value)
        return params.toString()
    }

    const onSubmit = async (data) => {
        try {
            data.courseId = courseId;
            data.id = id;
            const res = await axios.post("/api/chapterTopic/updateTopic", data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push(`/admin/topics?${createQueryString('courseName', courseName)}&${createQueryString('courseId', courseId)}&${createQueryString('chapterName', chapterName)}&${createQueryString('chapterId', chapterId)}`);
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const getTopicData = async () => {
        try {
            const res = await axios.post("/api/chapterTopic/getTopicByTopicId", {
                id: id
            })
            if (res.data.status == 1) {
                reset(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (id) {
            getTopicData()
        }
    }, [id])

    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            Update chapter
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



                                <button className="mt-2 px-4 btn btn-thm" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicEdit