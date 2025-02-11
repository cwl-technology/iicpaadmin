import React, { Suspense } from 'react'
import CourseEdit from './CourseEdit'

const page = () => {
  return (
    <Suspense>
        <CourseEdit/>
    </Suspense>
  )
}

export default page