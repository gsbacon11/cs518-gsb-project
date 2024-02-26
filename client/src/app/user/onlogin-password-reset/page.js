import PasswordResetOnLogin from "@/components/password_reset/onlogin_password_reset";
import Logo from "@/components/common/main_logo";
import styles from '@/app/PreSignIn.module.css';
//"use client";
export default function Home() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo/>
        <PasswordResetOnLogin />
      </div>
    </main>
  );
}