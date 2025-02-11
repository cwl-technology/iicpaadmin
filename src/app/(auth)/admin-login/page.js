"use client"

import React, {useState } from 'react'
import Link from 'next/link';
// import api from '@/_config/config';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'

const page = () => {
  const [adminLogin, setAdminLogin] = useState({})
  const [loader, setLoader] = useState(false);

  const router = useRouter()

  const handleLoginDetails = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setAdminLogin({ ...adminLogin, [name]: value })
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const res = await api.post(`/auth/admin_login`, adminLogin);
      setLoader(false);

      if (res.data.status === 0) {
        toast.error(res.data.message);
      } else {
        const token = res.data.token;
        localStorage.setItem("token", token);
        router.push("/admin")
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
      
            <input type="email" name="email" onChange={handleLoginDetails} className=' form-control form-control-login' placeholder='Enter your email' />
          </div>
          <div className='my-3'>

            <input type="password" name="password" onChange={handleLoginDetails} className='form-control form-control-login'
              placeholder='Enter your password' />
          </div>
          <div className='d-flex justify-content-between'>
            <button onClick={handleLogin} className='btn btn-success mt-2 mb-2  form-control admin-login-btn' disabled={loader}>{loader ? "Loading..." : "Login"}</button>
             
          </div>
            <Link href="/admin-login/change-password" className='text-success text-fg'><em>Forget Password?</em></Link>
        </div>
      </div>


    </>
  )
}

export default page