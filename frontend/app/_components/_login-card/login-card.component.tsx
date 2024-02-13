'use client'
import React, { MouseEventHandler, useRef, useState } from 'react'
import styles from './login-card.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeOut, FadeUpVarient, LoginTextExit } from '@/app/_utils/motion-variants'
import validator from 'validator';
import { useRouter } from 'next/navigation'
import { bodoni } from '@/app/_data/_font'


const LoginCard = () => {

    const router = useRouter();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [failLogin, setFailLogin] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const userRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);

    // handle input event
    const handleInput = () => {
        if (userRef.current?.value && passwordRef.current?.value) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    }

    // handle submit form event
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        const userInput = validator.escape(userRef.current?.value).trim();        
        const passwordInput = validator.escape(passwordRef.current?.value).trim();        
        if (!userInput || !passwordInput) return failAndResetForm(); 

        const data = {['username']: userInput, ['password']: passwordInput};
        
        try {
            const res = await fetch('/api/login',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resData = await res.json()
            // console.log(resData.valid);            

            if (resData.valid){
                setLoginSuccess(true);
                setTimeout(() => {
                    // console.log('redirect');            
                    router.push('/')
                }, 1000);
            } else {                
                failAndResetForm(resData.errorMsg);
            }
             
        } 
        
        catch (error) {
            console.log('catch:' + error);            
            failAndResetForm();
        } 
        
    }

    // reset form
    const failAndResetForm = (message = 'Please try again.') => {
        setErrorMsg(message)
        setFailLogin(true);
        userRef.current.value = '';
        passwordRef.current.value = '';
        
    }

    return (
        <>
            <AnimatePresence>
                {
                    loginSuccess ?  '' :
                    <>
                        <motion.div className={styles.BodyBackground} variants={FadeOut} exit='exit'></motion.div>
                        <motion.div className={`${bodoni.className} ${styles.TopLogo}`} variants={LoginTextExit} exit='exitTop'>ULTC</motion.div>
                        <motion.div className={`${bodoni.className} ${styles.BottomLogo}`} variants={LoginTextExit} exit='exitBottom'>ANALYTICS</motion.div>
                        <motion.div 
                            className={styles.LoginCard}
                            variants={FadeUpVarient}
                            initial='start'
                            animate='end'
                            exit='exit'
                        >
                            <form className={styles.FormBody} action="">

                                {/* Username */}
                                <motion.div className={styles.InputContainer} variants={FadeUpVarient}>
                                    <input type="text" className={styles.FormInput}  ref={userRef} onInput={handleInput} required />
                                    <div className={styles.PlaceholderText}>Username</div>
                                </motion.div>

                                {/* password */}
                                <motion.div className={styles.InputContainer} variants={FadeUpVarient}>
                                    <input type="password" className={styles.FormInput} ref={passwordRef} onInput={handleInput} required />
                                    <div className={styles.PlaceholderText}>Password</div>
                                </motion.div>                        

                                {/* submit button */}
                                <motion.div className={styles.InputContainer} variants={FadeUpVarient}>
                                    {/* Fail text */}
                                    <span>
                                        {
                                            !failLogin ? '' : (
                                                <div className={styles.FailMessage}>* {errorMsg}</div>
                                            ) 
                                        }
                                    </span>

                                    {/* button */}
                                    <button className={`${styles.SubmitButton} ${isComplete ? '' : 'disabled'}`} onClick={handleSubmit}>
                                        Log In
                                    </button>
                                </motion.div>
                            </form>

                            <motion.div className={styles.ResetPw} variants={FadeUpVarient}>Reset Password</motion.div>
                        </motion.div>
                    </>
                }
            </AnimatePresence>
        </>
    )
}

export default LoginCard