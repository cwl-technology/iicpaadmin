import React, { Suspense } from 'react'
import CreateTopic from './CreateTopic'

const page = () => {
    return (
        <Suspense>
            <CreateTopic />
        </Suspense>
    )
}

export default page