"use client";
import PasswordResetOnLogin from "@/components/user/onlogin_password_reset/onlogin_password_reset";
import Logo from "@/components/common/main_logo";
import styles from "@/components/common/Common.module.css";

export default function Home() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo />
        <PasswordResetOnLogin />
      </div>
    </main>
  );
}
