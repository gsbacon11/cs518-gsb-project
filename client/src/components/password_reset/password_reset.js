"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import styles from "@/components/common/Common.module.css";
import { validateEmailString } from "../common/ui_validation";
import { ErrorLabel } from "../common/dynamic_labels";
import { apiPasswordReset } from "@/app/api";

export default function PasswordReset() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const refInputEmail = useRef();

  const requestPasswordReset = async () => {
    var data = await apiPasswordReset(email);
    if (!data.found) {
      setEmailValid(false);
      refInputEmail.current.style.borderColor = "red";
      return;
    }
    router.push("/account-status/confirm-password-reset");
  };

  function onPasswordReset() {
    var email_valid = validateEmailString(email);
    if (!email_valid) {
      refInputEmail.current.style.borderColor = "red";
      setEmailValid(false);
      return;
    }
    requestPasswordReset();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.mainForm}>
        <div className={styles.mainFormDiv}>
          <label className={styles.labelFormHeader}>Reset Password</label>
          <input
            type="text"
            ref={refInputEmail}
            className={styles.inputText}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className={styles.divUserError}>
            {" "}
            {!emailValid && (
              <ErrorLabel arg={"Email is incorrect. Please try again."} />
            )}{" "}
          </div>
          <div className={styles.simpleDivision}></div>
          <button
            type="button"
            className={styles.mainPageButton}
            onClick={onPasswordReset}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
