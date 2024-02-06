import styles from './user-list-pagination.module.scss'

interface Props<T> {
    props: T
}

const UserListPagination: React.FC<Props<any>> = ({props}) => {

    const {data, currentPage, setCurrentPage, itemsPerPage} = props;

    const pageNumbers = Math.ceil(data.length / itemsPerPage);   
    const pageNumbersArray = Array.from({ length: pageNumbers }, (_, index) => index + 1);        

    const handlePage = (index : number) => {
        setCurrentPage(index);
    }

    return (
        <div className={styles.PaginationContainer}>
            <div className={`${styles.PaginationButton} ${currentPage === 1 && 'disabled'}`}>
                <span className="material-icons">keyboard_double_arrow_left</span>
            </div>
            <div className={`${styles.PaginationButton} ${currentPage === 1 && 'disabled'}`}>
                <span className="material-icons">keyboard_arrow_left</span>
            </div>
        

            {   
                pageNumbers &&
                pageNumbersArray.map((page, index) => (
                    <div
                        className={`
                            ${styles.PaginationButton} 
                            ${currentPage === index+1 ? 'pagination-active' : ''}
                        `} 
                        key={index}
                        onClick={()=>{handlePage(index+1)}}
                    >
                        {page}
                    </div>
                ))
            }

            <div className={`${styles.PaginationButton} ${currentPage === pageNumbersArray.length && 'disabled'}`}>
                <span className="material-icons">keyboard_arrow_right</span>
            </div>
            <div className={`${styles.PaginationButton} ${currentPage === pageNumbersArray.length && 'disabled'}`}>
                <span className="material-icons">keyboard_double_arrow_right</span>
            </div>

        </div>   
    )
}

export default UserListPagination