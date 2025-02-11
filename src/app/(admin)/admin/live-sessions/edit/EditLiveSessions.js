"use client"

import { useState, useRef, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

const EditLiveSessions = () => {

    const editor = useRef(null);
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...',
        height: "300px"
    }),
    );
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()
    const [description, setDescription] = useState();
    const [courseData, setCourseData] = useState();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");


    const onSubmit = async (data) => {
        try {
            data.description = description;
            data.id = id;
            const res = await axios.post("/api/livesessions/updateLiveSession", data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push("/admin/live-sessions/view");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getCourseData = async () => {
        try {
            const res = await axios.get("/api/courses/getAllActiveCourses");
            if (res.data.status == 1) {
                setCourseData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getLiveSessionsById = async () => {
        try {
            const res = await axios.post("/api/livesessions/getLiveSessionById", {
                id: id
            })
            if (res.data.status == 1) {
                reset(res.data.data);
                setDescription(res.data.data.description);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCourseData();
    }, [])

    useEffect(() => {
        if (id) {
            getLiveSessionsById();
        }
    }, [id])


    return (
        <div className="app-main__inner">
            <div className="row">
                <div className="col-md-12 col-xl-12">
                    <div className="main-card mb-3 card">
                        <div className="card-header">
                            Update Live Session
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label>
                                                Select Course
                                            </label>
                                            <select
                                                {...register("courseId", {
                                                    required: {
                                                        value: true,
                                                        message: "Course is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.courseId ? "border-danger" : ""}`}
                                            >

                                                <option hidden defaultChecked value={""}>Select Course</option>
                                                {
                                                    courseData?.map((ele, ind) =>
                                                        <option value={ele._id} key={ind}>{ele.courseName} </option>)
                                                }
                                            </select>
                                            {
                                                errors.courseId && <p className="text-danger">{errors.courseId.message}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label>
                                                Date
                                            </label>
                                            <input
                                                {...register("date", {
                                                    required: {
                                                        value: true,
                                                        message: "Event date is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.date ? "border-danger" : ""}`}
                                                type="date"
                                                placeholder="Enter the category name"
                                            />
                                            {errors.date &&
                                                <p className="text-danger">{errors.date.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label>
                                                Start Time
                                            </label>
                                            <input
                                                {...register("startTime", {
                                                    required: {
                                                        value: true,
                                                        message: "Start time is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.startTime ? "border-danger" : ""}`}
                                                type="time"
                                                placeholder="Enter the start time"
                                            />
                                            {errors.startTime &&
                                                <p className="text-danger">{errors.startTime.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label>
                                                End Time
                                            </label>
                                            <input
                                                {...register("endTime", {
                                                    required: {
                                                        value: true,
                                                        message: "End time is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.endTime ? "border-danger" : ""}`}
                                                type="time"
                                                placeholder="Enter the start time"
                                            />
                                            {errors.endTime &&
                                                <p className="text-danger">{errors.endTime.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="position-relative form-group">
                                            <label>
                                                Description
                                            </label>
                                            <JoditEditor
                                                ref={editor}
                                                value={description}
                                                config={config}
                                                tabIndex={1}
                                                onBlur={newContent => setDescription(newContent)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-2 px-3 btn btn-thm px-4" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Updating..." : "Update"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLiveSessions