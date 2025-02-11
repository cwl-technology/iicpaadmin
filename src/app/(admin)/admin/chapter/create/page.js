import React, { Suspense } from 'react'
import ChapterCreate from './ChapterCreate'
const page = () => {
    return (
        <Suspense>
            <ChapterCreate />
        </Suspense>
    )
}

export default page