"use client";
import Logo from "@/components/common/main_logo";
import ConfirmPasswordReset from "@/components/common/account_status/confirm_password_reset";
import styles from "@/components/common/Common.module.css";

export default function ConfirmPasswordResetPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo />
        <ConfirmPasswordReset />
      </div>
    </main>
  );
}
