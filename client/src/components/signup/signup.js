"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react"; 
import  { useRef } from "react";
import styles from '../home/Home.module.css';
import {validateEmailString, validatePasswordString} from '../common/ui_validation'
import {ErrorEmailLabel, ErrorPasswordLabel, ErrorPasswordsMismatchLabel} from '../common/dynamic_labels'

export default function HomeComponent() {
  const router = useRouter();
  const [email , setEmail] = useState('gsbacon11@gmail.com');
  const [emailValid , setEmailValid] = useState(true);
  const [password , setPassword] = useState('gsbacon11@gmail.com');
  const [passwordValid , setPasswordValid] = useState(true);
  const [passwordRetyped , setPasswordRetyped] = useState('gsbacon11@gmail.com');
  const [passwordsMatch , setPasswordsMatch] = useState(true);
  const refInputEmail = useRef();
  const refInputPassword = useRef();
  const refInputPasswordRetyped = useRef();

  function onSignUp(){
    var email_valid = validateEmailString(email);
    setEmailValid(email_valid);
    var password_valid = validatePasswordString(password);
    setPasswordValid(password_valid);
    var passwords_match = password == passwordRetyped;
    setPasswordsMatch(passwords_match);
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
    if(!passwords_match){
      refInputPasswordRetyped.current.style.borderColor = "red";
    }else{
      refInputPasswordRetyped.current.style.borderColor = "var(--silver_reign)";
    }
    if(email_valid && password_valid && passwords_match){
        router.push('/user');
    }
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                    <label className={styles.labelFormHeader}>Create Account</label>
                    <input type="text" ref={refInputEmail} className={styles.inputText} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    <div className={styles.divUserError}> {!emailValid && <ErrorEmailLabel/>} </div>
                    <input type="password" ref={refInputPassword} className={styles.inputText} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                    <div className={styles.divUserError}> {!passwordValid && <ErrorPasswordLabel/>} </div>
                    <input type="password" ref={refInputPasswordRetyped} className={styles.inputText} value={passwordRetyped} onChange={e => setPasswordRetyped(e.target.value)} placeholder="Retype Password"/>
                    <div className={styles.divUserError}> {!passwordsMatch && <ErrorPasswordsMismatchLabel/>} </div>
                    <div  className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton}  onClick={onSignUp}>Sign up</button>
                </div>
            </div>
    </main>
  );
}