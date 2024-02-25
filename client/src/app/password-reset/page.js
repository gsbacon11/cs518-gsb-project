import Logo from "@/components/common/main_logo";
import PasswordReset from "@/components/password_reset/password_reset";
import styles from '@/app/PreSignIn.module.css';
//"use client";
export default function PasswordResetPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo/>
        <PasswordReset />
      </div>
    </main>
  );
}

