"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import { useCookies } from "next-client-cookies";
import styles from "@/components/common/Common.module.css";
import { apiAuthLogin } from "@/app/api";
import { ErrorLabel } from "../common/dynamic_labels";

export default function AuthenticateLogin() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [inputValid, setInputValid] = useState(true);
  const refInput = useRef();
  const cookies = useCookies();

  const authLogin = async () => {
    const data = await apiAuthLogin(
      cookies.get("api_token"),
      cookies.get("userID"),
      passcode,
    );
    if (!data[1]) {
      refInput.current.style.borderColor = "red";
      setInputValid(false);
      return;
    }
    if (cookies.get("passwordReset") == 0) {
      router.push("/user");
    } else {
      router.push("/user/onlogin-password-reset");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.mainForm}>
        <div className={styles.mainFormDiv}>
          <label className={styles.labelFormHeader}>
            Two Factor Authentication
          </label>
          <input
            type="text"
            ref={refInput}
            className={styles.inputText}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode sent to email..."
          />
          <div className={styles.divUserError}>
            {" "}
            {!inputValid && (
              <ErrorLabel arg={"Passcode incorrect. Please try again."} />
            )}{" "}
          </div>
          <div className={styles.simpleDivision}></div>
          <button
            type="button"
            className={styles.mainPageButton}
            onClick={authLogin}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
