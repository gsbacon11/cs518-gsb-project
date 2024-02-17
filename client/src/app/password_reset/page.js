import Image from "next/image";
import PasswordReset from "@/components/password_reset/password_reset";
import styles from '../PreSignIn.module.css';
//"use client";
export default function Home() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Image src="./old-dominion-monarchs.svg" width={500} height={500} alt="odu_logo" id={styles.oduLogo}/>
        <PasswordReset />
      </div>
    </main>
  );
}

