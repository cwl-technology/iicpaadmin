"use client";

import axios from "axios";
// import api from "@/_config/config";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTable } from "simple-datatables";
import Swal from "sweetalert2";

export default function Topics() {

    const [topicData, setTopicData] = useState();
    const searchParams = useSearchParams();

    const courseId = searchParams.get("courseId");
    const courseName = searchParams.get("courseName");
    const chapterId = searchParams.get("chapterId");
    const chapterName = searchParams.get("chapterName");
    const router = useRouter();

    const getTopicData = async () => {
        try {
            const res = await axios.post(`/api/chapterTopic/getAllTopicsByCourseAndChapter`, {
                courseId: courseId,
                chapterId: chapterId
            });

            if (res.data.status == 1) {
                setTopicData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            icon: "warning",
            width: "400px",
            title: "Are you sure?",
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Delete",
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-secondary",
            }
        })

        if (result.isConfirmed) {
            try {
                const res = await axios.post(`/api/chapterTopic/deleteTopic`, {
                    id: id
                })
                if (res.data.status == 1) {
                    toast.success(res.data.message);
                    getTopicData();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleChangeStatus = async (id, status) => {
        const result = await Swal.fire({
            icon: "warning",
            width: "400px",
            title: "Are you sure?",
            allowOutsideClick: false,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: `${status == 1 ? "Deactivate" : "Activate"}`,
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-outline-secondary",
            }
        })
        if (result.isConfirmed) {
            try {
                const res = await axios.post(`/api/chapterTopic/changeStatus`, {
                    id: id,
                    status: status
                })
                if (res.data.status === 1) {
                    getTopicData();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        if (topicData) {
            new DataTable("#myTable");
        }
    }, [topicData]);

    useEffect(() => {
        if (courseId && chapterId) {
            getTopicData();
        }
    }, [courseId, chapterId])

    return (
        <>
            <div className="app-main__inner">

                <div className="row">
                    <div className="col-md-12 col-xl-12">
                        <div className="main-card mb-3 card">
                            <div className="card-header d-flex justify-content-between">
                                <div>
                                    View Topics
                                </div>
                                <Link className="btn btn-secondary mr-2"
                                    href={{
                                        pathname: "/admin/topics/create",
                                        query: {
                                            courseName: courseName,
                                            courseId: courseId,
                                            chapterName: chapterName,
                                            chapterId: chapterId
                                        }
                                    }} >
                                    Add Topic
                                </Link>
                            </div>

                            <div className="table-responsive">
                                <table
                                    id="myTable"
                                    className="align-middle mb-0 table table-borderless table-striped table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center">sr. no.</th>
                                            <th className="text-center">Course Name</th>
                                            <th className="text-center">Chapter Name</th>
                                            <th className="text-center">Topic Name</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            topicData?.map((ele, ind) => (
                                                <tr key={ind}>
                                                    <td className="text-center text-muted">#{ind + 1}</td>
                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {courseName}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {chapterName}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="widget-heading text-center">
                                                            {ele.topicName}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {
                                                            ele.status == 1 ? <div className="badge badge-warning" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Active</div> : <div className="badge badge-secondary" style={{ cursor: "pointer" }} onClick={() => handleChangeStatus(ele._id, ele.status)}>Inactive</div>
                                                        }

                                                    </td>
                                                    <td className="text-center">
                                                        <Link href={{
                                                            pathname: "/admin/sub-topics",
                                                            query: {
                                                                courseName: courseName,
                                                                courseId: courseId,
                                                                chapterName: chapterName,
                                                                chapterId: chapterId,
                                                                topicName: ele.topicName,
                                                                topicId: ele._id
                                                            }
                                                        }} className="btn btn-primary btn-sm mr-2">Sub Topics</Link>
                                                        <Link href={{
                                                            pathname: "/admin/topics/edit",
                                                            query: {
                                                                courseName: courseName,
                                                                courseId: courseId,
                                                                chapterName: chapterName,
                                                                chapterId: chapterId,
                                                                topicId: ele._id
                                                            }
                                                        }} className="btn btn-primary btn-sm mr-2">Edit</Link>
                                                        <Link href="#" className="btn btn-danger btn-sm  mr-2" onClick={() => handleDelete(ele._id)}>Delete</Link>

                                                    </td>
                                                </tr>
                                            ))
                                        }



                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
