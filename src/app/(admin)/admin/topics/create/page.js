import React, { Suspense } from 'react'
import TopicCreate from './TopicCreate'

const page = () => {
    return (
        <Suspense>
            <TopicCreate />
        </Suspense>
    )
}

export default page