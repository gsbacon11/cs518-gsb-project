"use client";
import styles from "@/components/common/Common.module.css";
import { useCookies } from "next-client-cookies";
import { useRef } from "react";
import { useState } from "react";
import { apiPasswordResetOnLogin } from "@/app/api";
import { validatePasswordString } from "../common/ui_validation";

export default function AccountSetting() {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordRetyped, setPasswordRetyped] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordSet, setPasswordSet] = useState(false);
  const refInputPassword = useRef();
  const refInputPasswordRetyped = useRef();
  const cookies = useCookies();

  function onConfirm() {
    var password_valid = validatePasswordString(password);
    setPasswordValid(password_valid);
    var passwords_match = password == passwordRetyped;
    setPasswordsMatch(passwords_match);
    if (!password_valid) {
      refInputPassword.current.style.borderColor = "red";
      setPasswordSet(false);
    } else {
      refInputPassword.current.style.borderColor = "var(--silver_reign)";
    }
    if (!passwords_match) {
      refInputPasswordRetyped.current.style.borderColor = "red";
      setPasswordSet(false);
    } else {
      refInputPasswordRetyped.current.style.borderColor = "var(--silver_reign)";
    }
    if (password_valid && passwords_match) {
      apiPasswordResetOnLogin(
        cookies.get("api_token"),
        cookies.get("userID"),
        password,
      );
      setPasswordSet(true);
    }
  }

  return (
    <main className="pt-5">
      <div className={styles.mainFormUser}>
        <div className="text-left pb-5">
          <div>
            <label className="text-5xl pl-5">Account Settings</label>
          </div>
          <div className={styles.simpleDivision}></div>
          <div className="pt-5"></div>
          <div>
            <label className="text-2xl pl-5">Email</label>
          </div>
          <div>
            <label className="text-l pl-5">Your email is </label>
            <label className="text-l font-bold">{cookies.get("email")}</label>
          </div>
          <div className={styles.simpleDivision}></div>
          <div className="pt-5"></div>
          <div>
            <label className="text-2xl pl-5">Password</label>
          </div>
          <div className="pl-5 pr-60">
            <input
              type="password"
              ref={refInputPassword}
              className={styles.inputText}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <div className={styles.divUserError}>
              {" "}
              {!passwordValid && (
                <label>
                  Password does not meet the complexity criteria.
                </label>
              )}{" "}
            </div>
            <input
              type="password"
              ref={refInputPasswordRetyped}
              className={styles.inputText}
              value={passwordRetyped}
              onChange={(e) => setPasswordRetyped(e.target.value)}
              placeholder="Retype New Password"
            />
            <div className={styles.divUserError}>
              {" "}
              {!passwordsMatch && (
                <label>Passwords do not match. Please try again.</label>
              )}{" "}
            </div>
            <div className="pr-[67px]">
              {passwordSet && <label>Your password has been updated.</label>}
              <button
                type="button"
                className={styles.mainPageButton}
                onClick={onConfirm}
              >
                Confirm Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

//"bg-[#003057] text-white text-2xl rounded-2xl"
