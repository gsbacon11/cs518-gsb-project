"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from '../home/Home.module.css';
import {validateEmailString} from '../common/ui_validation'

export default function AuthenticateLogin() {

  const router = useRouter();
  const [email , setEmail] = useState('gsbacon11@gmail.com');
  const [emailValid , setEmailValid] = useState(true);
  const refInput = useRef();

  function onLogIn(){
    var email_valid = validateEmailString(email);
      setEmailValid(email_valid);
      if(email_valid){
        refInput.current.style.borderColor = "var(--silver_reign)";
          router.push('/user');
      }else{
        refInput.current.style.borderColor = "red";
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
                <div className={styles.mainFormDiv}>
                    <label className={styles.labelFormHeader}>Two Factor Authentication</label>
                    <input type="text"  ref={refInput} className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Passcode sent to email..."/>
                    <div className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton} onClick={onLogIn}>Log In</button>
                </div>
            </div>
    </main>
  );
}