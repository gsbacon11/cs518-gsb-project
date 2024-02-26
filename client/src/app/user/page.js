"use client";
import Image from "next/image";
import { useCookies } from 'next-client-cookies';
import Header from "@/components/common/header";
import styles from '@/app/PreSignIn.module.css';
import AdminView from "@/components/user/admin_view";

export default function MainViewPage() {
  const cookies = useCookies();

  return (
    <main>
      <Header/>
      <div id={styles.divMainVert}>
        {
          cookies.get("isAdmin") != 0 ?
          <AdminView/> :
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <label className='text-5xl text-white'>Welcome {cookies.get('email')}!</label>
          </div>
        }
      </div>
    </main>
  );
}