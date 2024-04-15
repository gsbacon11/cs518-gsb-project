"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import { useCookies } from "next-client-cookies";
import styles from "@/components/common/Common.module.css";
import {
  validateEmailString,
  validatePasswordString,
} from "../common/ui_validation";
import { ErrorLabel } from "../common/dynamic_labels";
import { apiLookupEmail, apiRequestToken, apiLogin } from "@/app/api";
import ReCAPTCHA from "react-google-recaptcha";

export default function HomeComponent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  //const [emailValid , setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const refInputEmail = useRef();
  const refInputPassword = useRef();
  const cookies = useCookies();
  const recaptchaRef = useRef(null);

  function styleError() {
    refInputEmail.current.style.borderColor = "red";
    refInputPassword.current.style.borderColor = "red";
  }

  const signIn = async () => {
    const data = await apiLookupEmail(email);
    if (!data.found) {
      setInputValid(false);
      styleError();
      return;
    }
    if (!data.result[0].isApproved) {
      router.push("/account-status");
      return;
    }

    const data1 = await apiRequestToken(email, password);
    if (data1[0] != 200) {
      setInputValid(false);
      styleError();
      return;
    }
    await apiLogin(data1[1].data.toke);
    cookies.set("api_token", data1[1].data.toke);
    cookies.set("email", data1[1].data.email);
    cookies.set("userID", data1[1].data.userID);
    cookies.set("isAdmin", data1[1].data.isAdmin);
    cookies.set("passwordReset", data1[1].data.passwordReset);
    router.push("/authenticate-login");
  };

  const onSignIn = (event) => {
    event.preventDefault();
    recaptchaRef.current.execute();
  };

  const onReCAPTCHAChange = () => {
    var email_valid = validateEmailString(email);
    var password_valid = validatePasswordString(password);
    var input_valid = password_valid && email_valid;
    setInputValid(input_valid);
    if (!input_valid) {
      styleError();
      return;
    }
    signIn();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.mainForm}>
        <div className={styles.mainFormDiv}>
          <div className="pt-2"></div>
          <input
            type="text"
            ref={refInputEmail}
            className={styles.inputText}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className={styles.divUserError}></div>
          <input
            type="password"
            ref={refInputPassword}
            className={styles.inputText}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className={styles.divUserError}></div>
          <div className={styles.divUserError}>
            {" "}
            {!inputValid && (
              <ErrorLabel
                arg={
                  "Email and password combination invalid. Please try again."
                }
              />
            )}{" "}
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
          />
          <button
            type="button"
            className={styles.mainPageButton}
            onClick={onSignIn}
          >
            Log In
          </button>
          <div id={styles.divLinkForgotPassword}>
            <a href="/password-reset">Forgot password?</a>
          </div>
          <div className={styles.simpleDivision}></div>
          <div>
            <a href="/signup" id={styles.linkCreateAccount}>
              Create New Account
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
