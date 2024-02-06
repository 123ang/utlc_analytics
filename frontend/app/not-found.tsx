import React from 'react'
import styles from './home.module.scss'
import Link from 'next/link'
import { poppins } from './_data/_font'

const NotFound = () => {
  return (
    <div className={`${styles.BodyContainer} ${styles.NotFoundContainer} ${poppins.className}`}>
      <h1 className={styles.TitleText}>404</h1>        
      <p className={styles.DescriptionText}>PAGE NOT FOUND</p>
      <Link href='/'>
        <div className={styles.ButtonLink}>Back to Dashboard</div>
      </Link>
    </div>
  )
}

export default NotFound