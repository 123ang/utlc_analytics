import React from 'react'
import styles from '../_user-list-modal/user-list-modal.module.scss'

const UserListModalReset = ({props}: any) => {    
    const {userData, setState, setStateKey} = props;

    const handleCancel = () => {
        setState(setStateKey);    
    }
    
    const handleConfirm = () => {
        console.log('Reset User Password');    
    }

    return (
        <div className={styles.CardBodyContainer}>
            <div className={styles.TitleContainer}>Reset Password</div>
            <div className={styles.DescriptionContainer}>
                Do you want to reset {userData.name}'s password ?
            </div>
            <div className={styles.ButtonContainer}>
                <button className={styles.CancelButton} onClick={handleCancel}>Cancel</button>
                <button className={styles.ConfirmButton} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default UserListModalReset