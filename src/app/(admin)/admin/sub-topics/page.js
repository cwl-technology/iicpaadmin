import React, { Suspense } from 'react'
import SubTopic from './SubTopic'

const page = () => {
    return (
        <Suspense>
            <SubTopic />
        </Suspense>
    )
}

export default page