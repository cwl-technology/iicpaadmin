import React, { Suspense } from 'react'
import TopicEdit from './TopicEdit'

const page = () => {
  return (
    <Suspense>
        <TopicEdit/>
    </Suspense>
  )
}

export default page