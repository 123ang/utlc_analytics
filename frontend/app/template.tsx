'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { usePathname } from 'next/navigation'
import { checkLoginStatus, goToDashboard } from './_utils/check-login-status'
import { FadeUpVarient } from './_utils/motion-variants'
import Sidebar from './_components/sidebar/sidebar.component'

const Template = ({children} : {children: React.ReactNode}) => {
    const pathname = usePathname();        

    // check is the user login, if not then redirect to login 
    if (pathname !== '/login') {
        checkLoginStatus();      
    } else {
        goToDashboard();
    }

    return (
        <>
            <AnimatePresence>
                { pathname === '/login' ? 
                    (
                        <main className='main-container'>                    
                            <div className='w-full' key={pathname} >{children}</div>
                        </main>
                    ) : 
                    (
                        <>
                            <main className='main-container' >                    
                                <Sidebar />
                                <motion.div 
                                    className='w-full' 
                                    key={pathname} 
                                    variants={FadeUpVarient}
                                    initial='start'
                                    animate='end'
                                    exit='exit'
                                >
                                    {children}
                                </motion.div>
                            </main>
                        </>
                    )
                }
                
            </AnimatePresence>
        </>
    )
}

export default Template