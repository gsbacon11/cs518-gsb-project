import styles from '../home/Home.module.css'

export default function HomeComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                    <label id="label-create-account" className={styles.labelFormHeader}>Create Account</label>
                    <input type="text" id="input-email" className={styles.inputText} placeholder="Email"/>
                    <div id="div-error-email" className={styles.divUserError}></div>
                    <input type="password" id="input-password" className={styles.inputText} placeholder="Password"/>
                    <div id="div-error-password" className={styles.divUserError}></div>
                    <input type="password" id="input-password_retype" className={styles.inputText} placeholder="Retype Password"/>
                    <div id="div-error-password_retype" className={styles.divUserError}></div>
                    <div  className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton}  onclick="onSignUp()">Sign up</button>
                </div>
            </div>
    </main>
  );
}