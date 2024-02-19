"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from '../home/Home.module.css';
import {validatePasswordString} from '../common/ui_validation'
import {ErrorPasswordLabel, ErrorPasswordsMismatchLabel} from '../common/dynamic_labels'

export default function PasswordResetVerification() {
  const router = useRouter();
  const [password , setPassword] = useState('gsbacon11@gmail.com');
  const [passwordValid , setPasswordValid] = useState(true);
  const [passwordRetyped , setPasswordRetyped] = useState('gsbacon11@gmail.com');
  const [passwordsMatch , setPasswordsMatch] = useState(true);
  const refInputPassword = useRef();
  const refInputPasswordRetyped = useRef();

  function onSignUp(){
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
        router.push('/account-status/confirm-password-reset');
    }
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                    <label className={styles.labelFormHeader}>Create New Password</label>
                    <input type="password" ref={refInputPassword} className={styles.inputText} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    <div className={styles.divUserError}> {!passwordValid && <ErrorPasswordLabel/>} </div>
                    <input type="password" ref={refInputPasswordRetyped} className={styles.inputText} value={passwordRetyped} onChange={e => setPasswordRetyped(e.target.value)} placeholder="Retype Password"/>
                    <div className={styles.divUserError}> {!passwordsMatch && <ErrorPasswordsMismatchLabel/>} </div>
                    <div  className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton}  onClick={onSignUp}>Confirm New Password</button>
                </div>
            </div>
    </main>
  );
}