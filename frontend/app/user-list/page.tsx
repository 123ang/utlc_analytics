import React, { Suspense } from 'react'
import { pageMetadata } from '../_data/_metadata'
import globalStyles from '../global.module.scss'
import styles from './style.module.scss'
import UserListTable from '../_components/_user-list-table/user-list-table.component';
import TableColLoader from '../_components/_loader/table-col-loader';

const {title, description} = pageMetadata.userList;
export const metadata = {title, description};

const UserList = () => {
        
    return (
        <div className={globalStyles.BodyContainer}>
            <div className={globalStyles.TitleContainer}>
                <h6 className={globalStyles.TitleText}>User List</h6> 
            </div>       
            {/* Table Header */}
            <div className={styles.TableContainer}>
                <div className={`${globalStyles.CardContainer}`}>
                    <div className={styles.TableHeader}>
                        <div className={`${styles.TableItem} `}>Name</div>
                        <div className={`${styles.TableItem} `}>Email</div>
                        <div className={`${styles.TableItem} `}>Username</div>
                        <div className={`${styles.TableItem}  ${styles.TableAction}`}></div>
                    </div>
                </div>   
            </div>
            <Suspense fallback={<TableColLoader />}>
                <UserListTable />
            </Suspense>
        </div>
    )
}

export default UserList