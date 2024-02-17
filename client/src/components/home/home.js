"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import styles from './Home.module.css';
import {validateEmailString, validatePasswordString} from '../common/ui_validation'

function ErrorEmail(){
    return(<label>Please enter a valid email</label>);
}

function ErrorPassword(){
    return(<label>Password must be greater than 7 characters with no spaces</label>);
}

export default function HomeComponent() {
    const router = useRouter();
    const [email , setEmail] = useState('gsbacon11@gmail.com');
    const [emailValid , setEmailValid] = useState(true);
    const [password , setPassword] = useState('gsbacon11@gmail.com');
    const [passwordValid , setPasswordValid] = useState(true);

    function onSignIn(){
        var email_valid = validateEmailString(email);
        setEmailValid(email_valid);
        var password_valid = validatePasswordString(password);
        setPasswordValid(password_valid);
        if(email_valid && password_valid){
            router.push('/user');
        }
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                <input type="text" id="input-email" className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <div id="div-error-email" className={styles.divUserError}> {!emailValid && <ErrorEmail/>} </div>
                <input type="password" id="input-password" className={styles.inputText} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                <div id="div-error-password" className={styles.divUserError}> {!passwordValid && <ErrorPassword/>} </div>
                <button type="button" id="login-button" className={styles.mainPageButton} onClick={onSignIn} >Log In</button>
                <div id={styles.divLinkForgotPassword}>
                    <a href="/password_reset" id="link-forgot-password">Forgot password?</a>
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