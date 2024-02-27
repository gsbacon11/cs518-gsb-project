"use client";
import Logo from "@/components/common/main_logo";
import Signup from "@/components/signup/signup";
import styles from "@/components/common/Common.module.css";

export default function Home() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo />
        <Signup />
      </div>
    </main>
  );
}
