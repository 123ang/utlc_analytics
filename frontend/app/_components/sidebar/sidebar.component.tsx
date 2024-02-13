import 'material-icons/iconfont/filled.css';
import 'material-icons/iconfont/outlined.css';
import Link from 'next/link'
import styles from './sidebar.module.scss'
import { SidebarProps } from '@/app/_data/_types'
import { motion } from 'framer-motion'
import { NavFadeUpVarient, NavHover } from '@/app/_utils/motion-variants'
import { navLinks } from '@/app/_data/_navbar-title';
import { usePathname } from 'next/navigation';

// default value
const defaultProps = {
    extraClass : ''
}

const Sidebar : React.FC<{props?: SidebarProps}>  = ({props}) => { 
    const {extraClass} = props || defaultProps;    
    
    const pathArr = usePathname().split('/');
    const currentPath = pathArr[1];            

    return (
        <>
            <div className={`${extraClass} ${styles.BodyContainer}`}>
                <div className={styles.NavCard}>
                    <Link href='/'>
                        <div className={styles.LogoContainer}>ULTC</div>
                    </Link>

                    <div className={styles.NavLinkContainer}>
                        {
                            navLinks.map(navLink => (
                                <Link 
                                    href={`/${navLink.path}`} 
                                    className={`${currentPath === navLink.path ? 'nav-active' : ''}`} 
                                    key={navLink.name} 
                                >
                                    <motion.div className={styles.NavLink} initial='start' animate='end' whileHover='hover'>
                                        <span className="nav-title z-20 material-icons">{navLink.icon}</span>
                                        <div className='nav-title z-20'>{navLink.name}</div>
                                        <motion.div className={`${styles.HoverNav}`} variants={NavHover}></motion.div>
                                    </motion.div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar