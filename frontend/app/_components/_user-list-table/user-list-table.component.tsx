import React from 'react'
import styles from './user-list-table.module.scss'
import MotionComponent from '../_motion-component/motion-component-components'
import { CardContainerVarient } from '@/app/_utils/motion-variants'
import UserListTableColumn from '../_user-list-table-column/user-list-table-column.component'

const getUserList = async () => {
    try {
        // await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch('http://localhost:3000/api/user-list');
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);        
    }
}

const UserListTable = async () => {

    const userListDatas = await getUserList();    

    return (
        <>
            <MotionComponent variants={CardContainerVarient}>
                <div className={styles.BodyContainer}>
                    <div className={styles.TableContainer}>                        
                        <UserListTableColumn data={userListDatas}  />
                    </div>    
                </div> 
            </MotionComponent>
        </>
    )
}

export default UserListTable