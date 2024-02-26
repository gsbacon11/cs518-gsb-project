"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import { useCookies } from 'next-client-cookies';
import styles from '../home/Home.module.css';
import {apiPasswordResetOnLogin} from '@/app/api';
import {validatePasswordString} from '../common/ui_validation'
import {ErrorPasswordLabel, ErrorPasswordsMismatchLabel} from '../common/dynamic_labels'

export default function PasswordResetOnLogin() {
  const router = useRouter();
  const [password , setPassword] = useState('');
  const [passwordValid , setPasswordValid] = useState(true);
  const [passwordRetyped , setPasswordRetyped] = useState('');
  const [passwordsMatch , setPasswordsMatch] = useState(true);
  const refInputPassword = useRef();
  const refInputPasswordRetyped = useRef();
  const cookies = useCookies();

  function onConfirm(){
    var password_valid = validatePasswordString(password);
    setPasswordValid(password_valid);
    var passwords_match = password == passwordRetyped;
    setPasswordsMatch(passwords_match);
    if(!password_valid){
      refInputPassword.current.style.borderColor = "red";
    }else{
      refInputPassword.current.style.borderColor = "var(--silver_reign)";
    }
    if(!passwords_match){
      refInputPasswordRetyped.current.style.borderColor = "red";
    }else{
      refInputPasswordRetyped.current.style.borderColor = "var(--silver_reign)";
    }
    if(password_valid && passwords_match){
       apiPasswordResetOnLogin(cookies.get("api_token"), cookies.get("userID"), password);
        router.push('/user');
    }
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                    <label className={styles.labelFormHeader}>Create New Password</label>
                    <input type="password" ref={refInputPassword} className={styles.inputText} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    <div className={styles.divUserError}> {!passwordValid && <label>Password must be greater than 7 characters with no spaces.</label>} </div>
                    <input type="password" ref={refInputPasswordRetyped} className={styles.inputText} value={passwordRetyped} onChange={e => setPasswordRetyped(e.target.value)} placeholder="Retype Password"/>
                    <div className={styles.divUserError}> {!passwordsMatch && <label>Passwords do not match. Please try again.</label>} </div>
                    <div  className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton}  onClick={onConfirm}>Confirm</button>
                </div>
            </div>
    </main>
  );
}
