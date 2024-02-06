'use client'
import React, { useRef } from 'react'
import globalStyles from '@/app/global.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { ModalBackground, ModalCard } from '@/app/_utils/motion-variants'

const PopUpModal = ({children, props} :any) => {
    const {setState, setStateKey} = props;

    const cardRef = useRef<HTMLDivElement>(); 

    const handleClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if(cardRef.current?.contains(e.target as Node)) return;                
        setState(setStateKey);
    }

    return (
        <AnimatePresence>
            <motion.div 
                className={globalStyles.ModalContainer}
                variants={ModalBackground}
                initial='start'
                animate='end'
                onClick={handleClose}
            >
                <motion.div 
                    ref={cardRef as React.Ref<HTMLDivElement>}
                    className={globalStyles.CardContainer}
                    variants={ModalCard}
                >
                    {children}                                            
                </motion.div>
            </motion.div>  
        </AnimatePresence>     
    )
}

export default PopUpModal