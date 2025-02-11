"use client"

import React, { useState } from 'react'
import Link from 'next/link';
// import api from '@/_config/config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import axios from 'axios';

const page = () => {

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm()

  const router = useRouter()




  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/admin/login", data);

      if (res.data.status == 1) {
        router.push("/admin")
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className='d-flex align-items-center justify-content-center flex-column bg-light login-main'>

        <div className='px-5 py-4 shadow login-card' >
          <div className='d-flex justify-content-center mb-2'>
            <img src="/assets/images/logo.jpg" alt="" height="150px" />
            {/* <img src="/assets/images/logo_2.jpg" alt="" height="150px" /> */}
          </div>
          <div className='my-3'>

            <input type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required!"
                }
              })}
              className={`form-control form-control-login  ${errors.email ? "border-danger" : ""}`}
              placeholder='Enter your email' />
            {
              errors.email && <p className='text-danger ml-2'>{errors.email.message}</p>
            }
          </div>

          <div className='my-3'>
            <input type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required!"
                }
              })}
              className={`form-control form-control-login  ${errors.password ? "border-danger" : ""}`}
              placeholder='Enter your password' />
              {
              errors.password && <p className='text-danger ml-2'>{errors.password.message}</p>
            }
          </div>
          <div className='d-flex justify-content-between'>
            <button onClick={handleSubmit(onSubmit)} className='btn btn-success mt-2 mb-2  form-control admin-login-btn' disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Login"}</button>

          </div>
          <Link href="/admin-login/change-password" className='text-success text-fg'><em>Forget Password?</em></Link>
        </div>
      </div>


    </>
  )
}

export default page