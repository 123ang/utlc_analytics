'use client'
import React from 'react'
import { PulseLoader } from 'react-spinners'

const PulseLoading = () => {
  return (
    <div className='p-4'>
        <PulseLoader
          color="#acaca0"
          margin={8}
          size={10}
        />
    </div>
  )
}

export default PulseLoading