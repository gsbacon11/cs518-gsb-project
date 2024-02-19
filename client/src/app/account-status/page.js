import Logo from "@/components/common/main_logo";
import StatusAccountCreation from "@/components/common/account_status/account_creation";
import styles from '../PreSignIn.module.css';
//"use client";
export default function AccountStatusPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo/>
        <StatusAccountCreation/>
      </div>
    </main>
  );
}