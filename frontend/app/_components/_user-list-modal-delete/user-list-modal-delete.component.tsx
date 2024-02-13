import React from 'react'
import styles from '../_user-list-modal/user-list-modal.module.scss'

const UserListModalDelete = ({props}: any) => {    
    const {userData, setState, setStateKey} = props;

    const handleCancel = () => {
        setState(setStateKey);    
    }
    
    const handleConfirm = () => {
        console.log('Delete User');    
    }

    return (
        <div className={styles.CardBodyContainer}>
            <div className={styles.TitleContainer}>Delete User</div>
            <div className={styles.DescriptionContainer}>
                Do you want to <span className="text-red-500 font-semibold">delete</span> {userData.name} ?
            </div>
            <div className={styles.ButtonContainer}>
                <button className={styles.CancelButton} onClick={handleCancel}>Cancel</button>
                <button className={styles.ConfirmButton} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default UserListModalDelete