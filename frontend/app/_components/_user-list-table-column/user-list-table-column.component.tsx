'use client'
import React, { useEffect, useState } from 'react'
import styles from './user-list-table-column.module.scss'
import globalStyles from '../../global.module.scss'
import { motion } from 'framer-motion'
import { TableColumnVariant } from '@/app/_utils/motion-variants'
import UserListPagination from '@/app/user-list-pagination/user-list-pagination.component'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface UserListDataInterface {
    name: string,
    email: string,
    username: string,
    admin: boolean
}

interface Props<T> {
    data: T[]
}

const UserListTableColumn: React.FC<Props<UserListDataInterface>> = ({data}) => {    
    
    const [dataArray, setDataArray] = useState<UserListDataInterface[]>([]);    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    const searchParams = useSearchParams();

    useEffect(()=>{
        // chnage the param on the URL        
        const params = new URLSearchParams(searchParams);
        const paramPage = params.get('page');
        setCurrentPage(paramPage !== null ? parseInt(paramPage) : 1);        
        // console.log(paramPage);

        // based on current page render out the content 
        const start =  ( currentPage - 1) * itemsPerPage;
        const end = ( currentPage * itemsPerPage );
        
        console.log('current page: '+ currentPage);

        const listData = data.slice(start,end);
        setDataArray(listData);        
    }, [currentPage])


    return (
        <>
            {
                dataArray &&
                dataArray.map(data => (
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
                            <div className={`${styles.TableItem}  ${styles.TableAction}`}>Action</div>
                        </motion.div>
                    </div>
                ))
            }
            <UserListPagination props={{data, currentPage, setCurrentPage, itemsPerPage}}/>
        </>
    )
}

export default UserListTableColumn