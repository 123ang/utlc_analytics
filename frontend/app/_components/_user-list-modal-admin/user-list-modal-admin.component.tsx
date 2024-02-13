import React from 'react'
import styles from '../_user-list-modal/user-list-modal.module.scss'

const UserListModalAdmin = ({props}: any) => {    
    const {userData, setState, setStateKey} = props;

    const handleCancel = () => {
        setState(setStateKey);    
    }
    
    const handleConfirm = () => {
        console.log('Update admin status');    
    }

    return (
        <div className={styles.CardBodyContainer}>
            {
                userData.admin ? 
                (<div className={styles.TitleContainer}>Demote Admin</div>) :
                (<div className={styles.TitleContainer}>Promote Admin</div>) 
            }          
            <div className={styles.DescriptionContainer}>
                Do you want to {userData.admin ? 'demote' : 'promote'} {userData.name} ?
            </div>
            <div className={styles.ButtonContainer}>
                <button className={styles.CancelButton} onClick={handleCancel}>Cancel</button>
                <button className={styles.ConfirmButton} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default UserListModalAdmin