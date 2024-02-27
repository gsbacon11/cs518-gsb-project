"use client";
import Logo from "@/components/common/main_logo";
import PasswordReset from "@/components/password_reset/password_reset";
import styles from "@/components/common/Common.module.css";

export default function PasswordResetPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo />
        <PasswordReset />
      </div>
    </main>
  );
}
