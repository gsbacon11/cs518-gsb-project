"use client";
import { useRouter } from 'next/navigation';
//import { useState } from "react"; 
//import  { useRef } from "react";
import styles from '../../home/Home.module.css';

export default function StatusAccountCreation() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
              <label className={styles.labelFormHeader}>Account Requested</label>
              <div className='py-3'>
                <a>An email will be sent to you when the admin has responded to your request for account creation.</a>
              </div>
              <div className={styles.simpleDivision}></div>
              <div>
                <button type="button" className={styles.mainPageButton} onClick={e => router.push("/")}>Back to Sign In</button>
              </div>
            </div>
        </div>
    </main>
  );
}
