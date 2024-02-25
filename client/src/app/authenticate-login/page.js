import Logo from "@/components/common/main_logo";
import AuthenticateLogin from "@/components/authenticate_login/authenticate_login";
import styles from '@/app/PreSignIn.module.css';
//"use client";
export default function AuthenticateLoginPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo/>
        <AuthenticateLogin/>
      </div>
    </main>
  );
}