import React from 'react'
import styles from './dashboard-user-list.module.scss'

const DashboardUserList = async () => {

    // get dummy data
    const getUserListData:Function = async () => {
        try {
            // await new Promise(resolve => setTimeout(resolve, 3000))
            const res = await fetch('http://localhost:3000/api/dashboard');
            const data = await res.json();
                
            return data
        } 
        catch (error) {
            console.log(error);            
            return;            
        }
    };    
    const userDataList = await getUserListData();     

    return (
        <div className={styles.ContentContainer}>
            <div className={styles.ContentItem}>
                <div className={styles.ItemNumber}>
                    {userDataList ? userDataList.totalUser : 0}
                </div>
                <div className={styles.ItemTitle}>Total Users</div>
            </div>
            <div className={styles.ContentItem}>                                
                <div className={styles.ItemNumber}>
                    {userDataList ? userDataList.totalAdmin : 0}
                </div>
                <div className={styles.ItemTitle}>Total Admins</div>
            </div>
        </div>
    )
}

export default DashboardUserList