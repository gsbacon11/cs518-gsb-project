"use client";
import { useCookies } from "next-client-cookies";
import Header from "@/components/common/header";
import styles from "@/components/common/Common.module.css";
import AdminHomeTabs from "@/components/user/admin/home_tabs.js";


export default function MainViewPage() {
  const cookies = useCookies();

  return (
    <main>
      <Header />
      <div id={styles.divMainVert}>
        {cookies.get("isAdmin") != 0 ? (
          <AdminHomeTabs></AdminHomeTabs>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <label className="text-5xl text-white">
              Welcome {cookies.get("email")}!
            </label>
          </div>
        )}
      </div>
    </main>
  );
}
