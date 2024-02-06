import React from 'react'
import styles from './content-card.module.scss'

const ContentCard = ({children}:any) => {
  return (
    <div className={styles.CardContainer}>
        {children}
    </div>
  )
}

export default ContentCard