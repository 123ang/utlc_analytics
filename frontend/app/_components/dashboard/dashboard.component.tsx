import Link from 'next/link'
import React, { Suspense } from 'react'
import styles from './dashboard.module.scss'
import { pathUrl } from '@/app/_data/_navbar-title'
import { CardContainerVarient } from '@/app/_utils/motion-variants'
import MotionComponent from '../_motion-component/motion-component-components'
import ContentCard from '../_content-card/content-card.component'
import PulseLoading from '@/app/_components/_loader/pulse-loader'
import DashboardUserList from '../_dashboard-user-list/dashboard-user-list.component'

const Dashboard = () => {    
    
    return (
        <div className={styles.DashboardGrid}>
            <MotionComponent variants={CardContainerVarient}>
                <ContentCard>
                    <div className={styles.CardBody}>
                        <h6 className={styles.TitleText}>User List</h6>
                        <Suspense fallback={<PulseLoading />}>
                            <DashboardUserList />                        
                        </Suspense>
                        <Link href={pathUrl.userList} className={styles.CardButton}>Manage User List</Link>
                    </div>                    
                </ContentCard>
            </MotionComponent>
        </div>
    )
}

export default Dashboard