import React, { Suspense } from 'react'
import EditLiveSessions from './EditLiveSessions'

const page = () => {
  return (
    <Suspense>
        <EditLiveSessions/>
    </Suspense>
  )
}

export default page