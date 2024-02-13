'use client'
import React, { useEffect, useState } from 'react'
import styles from './user-list-table-column.module.scss'
import globalStyles from '../../global.module.scss'
import { motion } from 'framer-motion'
import { TableColumnVariant } from '@/app/_utils/motion-variants'
import UserListPagination from '@/app/user-list-pagination/user-list-pagination.component'
import UserListModal, { modalType } from '../_user-list-modal/user-list-modal.component'

interface UserListDataInterface {
    id: number,
    name: string,
    email: string,
    username: string,
    admin: boolean
}

interface Props<T> {
    data: T[]
}

const UserListTableColumn: React.FC<Props<UserListDataInterface>> = ({data}) => {    
    
    // set Item per page here
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [dataArray, setDataArray] = useState<UserListDataInterface[]>([]);    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userModal, setUserModal] = useState<null | string>(null);
    const [userData, setUserData] = useState<null | UserListDataInterface>(null);

    useEffect(()=>{
        // based on current page render out the content 
        const start =  ( currentPage - 1) * itemsPerPage;
        const end = ( currentPage * itemsPerPage );
        
        // console.log('current page: '+ currentPage);
        const listData = data.slice(start,end);
        setDataArray(listData);        
    }, [currentPage])

    const handleAdmin = (data:UserListDataInterface) => {
        setUserModal(modalType.admin);
        setUserData(data);        
    }

    const handleResetPassword = (data: UserListDataInterface) => {
        setUserModal(modalType.resetPassword);
        setUserData(data);
    }

    const handleDelete = (data: UserListDataInterface) => {
        setUserModal(modalType.deleteUser);
        setUserData(data);
    }

    return (
        <>
            {
                dataArray &&
                dataArray.map((data) => (
                    <div className={globalStyles.CardContainer} key={data.username}>
                        <motion.div 
                            className={styles.TableColumn}
                            whileHover='hover' 
                            variants={TableColumnVariant}                
                        >            
                            <div className={`${styles.TableItem} flex gap-2 items-center`}>
                                {data.admin ? (<span className="material-icons">verified</span>) : ''}
                                <span>{data.name}</span>
                            </div>
                            <div className={`${styles.TableItem} `}>{data.email}</div>
                            <div className={`${styles.TableItem} `}>{data.username}</div>
                            <div className={`${styles.TableItem}  ${styles.TableAction}`}>
                                <div className={styles.ActionItem} onClick={()=>{handleAdmin(data)}}>
                                    <span className={`material-icons ${!data.admin && 'opacity-25'}`}>verified</span>
                                </div>
                                <div className={styles.ActionItem} onClick={()=>{handleResetPassword(data)}}>
                                    <span className="material-icons">lock_reset</span>
                                </div>
                                <div className={styles.ActionItem} onClick={()=>{handleDelete(data)}}>
                                    <span className="material-icons">delete_forever</span>
                                </div>
                            </div>
                        </motion.div>                        
                    </div>                    
                ))
            }
            {
                userModal &&
                <UserListModal props={{userModal, userData, setState: setUserModal, setStateKey: null}} />
            }
            <UserListPagination props={{data, currentPage, setCurrentPage, itemsPerPage}}/>
        </>
    )
}

export default UserListTableColumn