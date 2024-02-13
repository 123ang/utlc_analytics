import React from 'react'
import styles from './user-list-modal.module.scss'
import globalStyles from '@/app/global.module.scss'
import PopUpModal from '../_pop-up-modal/pop-up-modal.component'
import UserListModalAdmin from '../_user-list-modal-admin/user-list-modal-admin.component'
import UserListModalReset from '../_user-list-modal-reset/user-list-modal-reset.component'
import UserListModalDelete from '../_user-list-modal-delete/user-list-modal-delete.component'

export const modalType = {
    admin: 'admin',
    resetPassword: 'resetPassword',
    deleteUser: 'deleteUser'
}

interface Props<T>{
    props: T
}

interface ModalTypeInterface<T> {
    userModal : string | null,
    userData: T,
    setState : React.Dispatch<React.SetStateAction<string | null>>,
    setStateKey: any;
}

const UserListModal: React.FC<Props<ModalTypeInterface<any>>> = ({props}) => {
    
    const {userModal, userData, setState, setStateKey} = props;        

    return (
        <PopUpModal props={{setState, setStateKey}}>
            <>
                {
                    userModal === modalType.admin &&
                    <UserListModalAdmin props={{userData, setState, setStateKey}} />                    
                }

                {
                    userModal === modalType.resetPassword &&
                    <UserListModalReset props={{userData, setState, setStateKey}} />                    
                }

                {
                    userModal === modalType.deleteUser &&
                    <UserListModalDelete props={{userData, setState, setStateKey}} />                    
                }
            </>            
        </PopUpModal>    
    )
}

export default UserListModal