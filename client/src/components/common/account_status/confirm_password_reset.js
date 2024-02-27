"use client";
import { useRouter } from "next/navigation";
import styles from "@/components/common/Common.module.css";

export default function StatusAccountCreation() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.mainForm}>
        <div className={styles.mainFormDiv}>
          <label className={styles.labelFormHeader}>Password Reset</label>
          <div className="py-3">
            <a>A temporary password has been sent to your email!</a>
          </div>
          <div className={styles.simpleDivision}></div>
          <div>
            <button
              type="button"
              className={styles.mainPageButton}
              onClick={(e) => router.push("/")}
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
