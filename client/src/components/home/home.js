"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from './Home.module.css';
import {validateEmailString, validatePasswordString} from '../common/ui_validation'
import {ErrorLabel} from '../common/dynamic_labels'
import {apiLookupEmail, apiRequestToken, apiLogin} from '@/app/api'


export default function HomeComponent() {
    const router = useRouter();
    const [email , setEmail] = useState('gsbacon11@gmail.com');
    //const [emailValid , setEmailValid] = useState(true);
    const [password , setPassword] = useState('gsbacon11@gmail.com');
    const [inputValid , setInputValid] = useState(true);
    const refInputEmail = useRef();
    const refInputPassword = useRef();
    
    function styleError(){
        refInputEmail.current.style.borderColor = "red";
        refInputPassword.current.style.borderColor = "red";
    }

    const signIn =  async () => {
        const data = await apiLookupEmail(email);
        console.log(data);
        if(!data.found){
            setInputValid(false);
            styleError();
            return;
        }
        if(!data.result[0].isApproved){
            router.push('/account-status');
            return
        }
        const data1 = await apiRequestToken(email, password);
        console.log(data1);
        console.log(data1.data.toke);
        await apiLogin(data1.data.toke);
        console.log(process.env.NEXT_PUBLIC_SERVER_IP);
        //router.push('/user');
    }

    function onSignIn(){
        var email_valid = validateEmailString(email);
        var password_valid = validatePasswordString(password);
        var input_valid = password_valid && email_valid;
        setInputValid(input_valid);
        if(!input_valid){
            styleError();
            return
        }
        signIn();
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                <input type="text" ref={refInputEmail} className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <div className={styles.divUserError}></div>
                <input type="password" ref={refInputPassword} className={styles.inputText} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                <div className={styles.divUserError}></div>
                <div className={styles.divUserError}> {!inputValid && <ErrorLabel arg={"Email and password combination invalid. Please try again."}/>} </div>
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