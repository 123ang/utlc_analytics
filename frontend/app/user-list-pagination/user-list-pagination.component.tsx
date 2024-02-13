import { useEffect, useState } from 'react';
import styles from './user-list-pagination.module.scss'

interface Props<T> {
    props: T
}

const UserListPagination: React.FC<Props<any>> = ({props}) => {

    const {data, currentPage, setCurrentPage, itemsPerPage} = props;

    const pageNumbers = Math.ceil(data.length / itemsPerPage);   
    const pageNumbersArray = Array.from({ length: pageNumbers }, (_, index) => index + 1);        
    const [renderPageNumber, setRenderPageNumber] = useState<any>([]);

    const handlePage = (index : number) => {
        setCurrentPage(index);
    }

    const handleMostPrev = () => {
        setCurrentPage(1);
    }

    const handleMostNext = () => {
        setCurrentPage(pageNumbersArray.length);
    }

    const handleChangePage = (index: number) => {
        setCurrentPage(currentPage + index);
    }

    const updateRenderPage = () => {
        if (currentPage-1 <= 0) {
            setRenderPageNumber(pageNumbersArray.slice(0, 3));
        }
        else if (currentPage >= pageNumbersArray.length) {
            setRenderPageNumber(pageNumbersArray.slice(pageNumbersArray.length - 3, pageNumbersArray.length));
        } 
        else {
            setRenderPageNumber(pageNumbersArray.slice(currentPage-2, currentPage+1))
        }
    }

    useEffect(()=>{
        updateRenderPage()
    }, [currentPage])

    return (
        <div className={styles.PaginationContainer}>
            <div className={`${styles.PaginationButton} ${currentPage === 1 && 'disabled'}`} onClick={handleMostPrev}>
                <span className="material-icons">keyboard_double_arrow_left</span>
            </div>
            <div className={`${styles.PaginationButton} ${currentPage === 1 && 'disabled'}`} onClick={()=>{handleChangePage(-1)}}>
                <span className="material-icons">keyboard_arrow_left</span>
            </div>
        

            {   
                pageNumbers &&
                pageNumbersArray.map((page, index) => (
                    <div
                        className={`
                            ${renderPageNumber.includes(page) ? '' : 'pagination-hide'}                            
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

            <div className={`${styles.PaginationButton} ${currentPage === pageNumbersArray.length && 'disabled'}`} onClick={()=>{handleChangePage(1)}}>
                <span className="material-icons">keyboard_arrow_right</span>
            </div>
            <div className={`${styles.PaginationButton} ${currentPage === pageNumbersArray.length && 'disabled'}`} onClick={handleMostNext}>
                <span className="material-icons">keyboard_double_arrow_right</span>
            </div>

        </div>   
    )
}

export default UserListPagination