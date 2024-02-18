"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from './Home.module.css';
import {validateEmailString, validatePasswordString} from '../common/ui_validation'
import {ErrorEmailLabel, ErrorPasswordLabel} from '../common/dynamic_labels'


export default function HomeComponent() {
    const router = useRouter();
    const [email , setEmail] = useState('gsbacon11@gmail.com');
    const [emailValid , setEmailValid] = useState(true);
    const [password , setPassword] = useState('gsbacon11@gmail.com');
    const [passwordValid , setPasswordValid] = useState(true);
    const refInputEmail = useRef();
    const refInputPassword = useRef();
    

    function onSignIn(){
        var email_valid = validateEmailString(email);
        setEmailValid(email_valid);
        var password_valid = validatePasswordString(password);
        setPasswordValid(password_valid);
        console.log(refInputEmail.value)
        if(!email_valid){
            refInputEmail.current.style.borderColor = "red";
        }else{
            refInputEmail.current.style.borderColor = "var(--silver_reign)";
        }
        if(!password_valid){
            refInputPassword.current.style.borderColor = "red";
        }else{
            refInputPassword.current.style.borderColor = "var(--silver_reign)";
        }
        if(email_valid && password_valid){
            router.push('/user');
        }
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                <input type="text" ref={refInputEmail} className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <div className={styles.divUserError}> {!emailValid && <ErrorEmailLabel/>} </div>
                <input type="password" ref={refInputPassword} className={styles.inputText} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                <div className={styles.divUserError}> {!passwordValid && <ErrorPasswordLabel/>} </div>
                <button type="button" className={styles.mainPageButton} onClick={onSignIn}>Log In</button>
                <div id={styles.divLinkForgotPassword}>
                    <a href="/password_reset">Forgot password?</a>
                </div>
                <div className={styles.simpleDivision}></div>
                <div>
                    <a href="/signup" id={styles.linkCreateAccount}>Create New Account</a>
                </div>
            </div>
        </div>
    </main>
  );
}