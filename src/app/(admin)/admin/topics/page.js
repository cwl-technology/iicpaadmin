import React, { Suspense } from 'react'
import Topics from './Topics'

const page = () => {
  return (
    <Suspense>
        <Topics/>
    </Suspense>
  )
}

export default page