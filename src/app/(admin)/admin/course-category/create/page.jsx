"use client"

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import axios from "axios";


const page = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/api/courseCategory/createCourseCategory", data);
            if (res.data.status == 1) {
                toast.success(res.data.message);
                router.push("/admin/course-category/view");
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
                            Create Course Category
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label>
                                                Category Name
                                            </label>
                                            <input
                                                {...register("categoryName", {
                                                    required: {
                                                        value: true,
                                                        message: "Category name is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.categoryName ? "border-danger" : ""}`}
                                                type="text"
                                                placeholder="Enter the category name"
                                            />
                                            {errors.categoryName &&
                                                <p className="text-danger">{errors.categoryName.message}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label>
                                                Category Slug
                                            </label>
                                            <input
                                                {...register("categorySlug", {
                                                    required: {
                                                        value: true,
                                                        message: "Category Slug is required!"
                                                    }
                                                })}
                                                className={`form-control ${errors.categorySlug ? "border-danger" : ""}`}
                                                type="text"
                                                placeholder="Enter the category slug"
                                            />
                                            {errors.categorySlug &&
                                                <p className="text-danger">{errors.categorySlug.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-2 px-3 btn btn-thm px-4" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page