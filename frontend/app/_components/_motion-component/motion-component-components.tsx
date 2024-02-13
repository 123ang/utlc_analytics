'use client'
import { Variant, motion } from 'framer-motion'
import React, {ReactNode} from 'react'

type MotionComponentProps = {
  children: ReactNode,
  variants?: Variant | any 
}

const MotionComponent: React.FC<MotionComponentProps> = ({children, variants}) => {
  
  return (
    <motion.div 
        variants={variants}
        initial='start'
        animate='end'
        exit='exit'
    >
        {children}
    </motion.div>
  )
}

export default MotionComponent