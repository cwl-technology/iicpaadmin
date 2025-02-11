import React, { Suspense } from 'react'
import EditCourseCategory from './EditCourseCategory'

const page = () => {
  return (
    <Suspense>
        <EditCourseCategory/>
    </Suspense>
  )
}

export default page