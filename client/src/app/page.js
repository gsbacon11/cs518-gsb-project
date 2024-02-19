
import HomeComponent from "@/components/home/home";
import Logo from "@/components/common/main_logo";
import styles from './PreSignIn.module.css';
//"use client";
export default function Home() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo/>
        <HomeComponent />
      </div>
    </main>
  );
}

