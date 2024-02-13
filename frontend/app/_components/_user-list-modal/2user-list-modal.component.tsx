import React, { useState } from 'react'
import styles from './user-list-modal.module.scss'
import globalStyles from '@/app/global.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { ModalBackground, ModalCard } from '@/app/_utils/motion-variants'

interface Props<T> {
    props: T
}

interface UserListModalProp<T> { 
    modalData: T,
    userModal: number | string,
    setUserModal: React.Dispatch<React.SetStateAction<number | string | null>>
}

const UserListModal:React.FC<Props<UserListModalProp<any>>> = ({props}) => {
    const {modalData, userModal, setUserModal} = props;      
    const data = modalData[0]      
    console.log(props);

    const [admin, setAdmin] = useState(data.admin);
    
    
    return (
        <AnimatePresence>
            <motion.div 
                className={globalStyles.ModalContainer}
                variants={ModalBackground}
                initial='start'
                animate='end'
            >
                <motion.div 
                    className={globalStyles.CardContainer}
                    variants={ModalCard}
                >
                    <div className={styles.BodyContainer}> 
                        <div>
                            {/* TITLE */}
                            <div className={styles.TitleContainer}>
                                <h6>#{data.id}</h6>
                                <h4>{data.name}</h4>
                            </div>     

                            {/* Details */}
                            <div className={styles.DetailContainer}>
                                <div className={styles.DetailItem}>
                                    <div className={styles.DetailItem}>
                                        <div className={styles.DetailTitle}>Name:</div>                        
                                        <div className={styles.DetailText}>{data.name}</div>                        
                                    </div>                        
                                </div>    
                                <div className={styles.DetailItem}>
                                    <div className={styles.DetailItem}>
                                        <div className={styles.DetailTitle}>Username:</div>                        
                                        <div className={styles.DetailText}>{data.username}</div>                        
                                    </div>                        
                                </div>    
                                <div className={styles.DetailItem}>
                                    <div className={styles.DetailItem}>
                                        <div className={styles.DetailTitle}>Email:</div>                        
                                        <div className={styles.DetailText}>{data.email}</div>                        
                                    </div>                        
                                </div>    
                            </div>  
                        </div>      
                        
                        {/* Action */}


                    </div>                                                
                </motion.div>
            </motion.div>  
        </AnimatePresence>     
    )
}

export default UserListModal