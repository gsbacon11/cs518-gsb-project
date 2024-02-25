"use client";
import Image from "next/image";
import styles from '@/app/PreSignIn.module.css';
import AdminView from "@/components/user/admin_view";

export default function MainViewPage() {
  return (
    <main>
      <div id={styles.divMainVert}>
        <AdminView/>
      </div>
    </main>
  );
}