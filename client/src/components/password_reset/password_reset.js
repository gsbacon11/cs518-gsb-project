"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from '../home/Home.module.css';
import {validateEmailString} from '../common/ui_validation'
import {ErrorEmailLabel} from '../common/dynamic_labels'

export default function PasswordReset() {

  const router = useRouter();
  const [email , setEmail] = useState('gsbacon11@gmail.com');
  const [emailValid , setEmailValid] = useState(true);
  const refInputEmail = useRef();

  function onPasswordReset(){
    var email_valid = validateEmailString(email);
      setEmailValid(email_valid);
      if(email_valid){
        refInputEmail.current.style.borderColor = "var(--silver_reign)";
          router.push('/password_reset/verification');
      }else{
        refInputEmail.current.style.borderColor = "red";
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
                <div className={styles.mainFormDiv}>
                    <label className={styles.labelFormHeader}>Reset Password</label>
                    <input type="text"  ref={refInputEmail} className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <div className={styles.divUserError}> {!emailValid && <ErrorEmailLabel/>} </div>
                    <div className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton} onClick={onPasswordReset}>Continue</button>
                </div>
            </div>
    </main>
  );
}