import styles from '../home/Home.module.css'

export default function PasswordReset() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
                <div className={styles.mainFormDiv}>
                    <label id="label-reset-password" className={styles.labelFormHeader}>Reset Password</label>
                    <input type="text" id="input-email" className={styles.inputText} placeholder="Email"/>
                    <div id="div-error-email" className={styles.divUserError}></div>
                    <div className={styles.simpleDivision}></div>
                    <button type="button" className={styles.mainPageButton} onclick="onPasswordReset()">Continue</button>
                </div>
            </div>
    </main>
  );
}