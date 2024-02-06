import React from 'react'
import styles from './style.module.scss'
import LoginCard from '../_components/_login-card/login-card.component'
import { pageMetadata } from '../_data/_metadata'

const {title, description} = pageMetadata.login

export const metadata = {title, description}

const Login = () => {  
  
  return (
    <>
      <div className='relative w-full'>
        <div className={styles.BodyContainer}>        
          <LoginCard />
        </div>
      </div>
    </>
  )
}

export default Login