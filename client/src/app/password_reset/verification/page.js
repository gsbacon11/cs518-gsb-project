import Logo from "@/components/common/main_logo";
import PasswordResetVerification from "@/components/password_reset/password_reset_verification";
import styles from '@/app/PreSignIn.module.css';
//"use client";
export default function PasswordResetVerificationPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo/>
        <PasswordResetVerification/>
      </div>
    </main>
  );
}

