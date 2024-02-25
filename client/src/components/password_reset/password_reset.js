"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from '../home/Home.module.css';
import {validateEmailString} from '../common/ui_validation'
import {ErrorLabel} from '../common/dynamic_labels'
import {apiPasswordReset} from '@/app/api'

export default function PasswordReset() {

  const router = useRouter();
  const [email , setEmail] = useState('gsbacon11@gmail.com');
  const [emailValid , setEmailValid] = useState(true);
  const refInputEmail = useRef();

  function onPasswordReset(){
    var email_valid = validateEmailString(email);
      if(!email_valid){
        refInputEmail.current.style.borderColor = "red";
        setEmailValid(false);
        return;
      }
      var data = apiPasswordReset(email);
      console.log(data);
      if(!data.found){
        setEmailValid(false);
        refInputEmail.current.style.borderColor = "red";
        return;
      }
      router.push('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
                <div className={styles.mainFormDiv}>
                    <label className={styles.labelFormHeader}>Reset Password</label>
                    <input type="text"  ref={refInputEmail} className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <div className={styles.divUserError}> {!emailValid && <ErrorLabel arg={"Email is not correct. Please try again."}/>} </div>
                    <div className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton} onClick={onPasswordReset}>Email Temporary Password</button>
                </div>
            </div>
    </main>
  );
}