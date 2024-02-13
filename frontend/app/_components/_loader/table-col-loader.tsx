'use client'
import React from 'react'
import TableColstyles from '@/app/_components/_user-list-table-column/user-list-table-column.module.scss'
import Tablestyles from '@/app/_components/_user-list-table/user-list-table.module.scss'
import globalStyles from '@/app/global.module.scss'
import styles from './loader.module.scss'
import { PulseLoader } from 'react-spinners'

const DUMMY_DATAS = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    // {id: '6'},
    // {id: '7'},
    // {id: '8'},
    // {id: '9'},
    // {id: '10'},
]

const TableColLoader = () => {
    
    return (
        <div className={Tablestyles.BodyContainer}>
            <div className={Tablestyles.TableContainer}>

                {
                    DUMMY_DATAS.map(data => (
                        <div className={globalStyles.CardContainer} key={data.id}>
                            <div className={`${TableColstyles.TableColumn} ${styles.ColLoader}`}>            
                                <PulseLoader  
                                    color="#acaca0"
                                    margin={8}
                                    size={10}
                                />
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default TableColLoader