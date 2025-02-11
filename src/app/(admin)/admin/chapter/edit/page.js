import React, { Suspense } from 'react'
import ChapterEdit from './ChapterEdit'

const page = () => {
  return (
    <Suspense>
        <ChapterEdit/>
    </Suspense>
  )
}

export default page