"use client";
import HomeComponent from "@/components/home/home";
import Logo from "@/components/common/main_logo";
import styles from "@/components/common/Common.module.css";

export default function Home() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <Logo />
        <HomeComponent />
      </div>
    </main>
  );
}
