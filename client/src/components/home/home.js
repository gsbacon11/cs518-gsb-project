import styles from './Home.module.css'

export default function HomeComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.mainForm}>
            <div className={styles.mainFormDiv}>
                <input type="text" id="input-email" className={styles.inputText} placeholder="Email"/>
                <div id="div-error-email" className={styles.divUserError}></div>
                <input type="password" id="input-password" className={styles.inputText} placeholder="Password"/>
                <div id="div-error-password"></div>
                <button type="button" id="login-button" className={styles.mainPageButton} onclick="onSignIn()" >Log In</button>
                <div id={styles.divLinkForgotPassword}>
                    <a href="/password_reset" id="link-forgot-password">Forgot password?</a>
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