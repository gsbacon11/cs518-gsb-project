"use client";
import { useCookies } from "next-client-cookies";
import Header from "@/components/common/header";
import styles from "@/components/common/Common.module.css";
import AdminHomeTabs from "@/components/user/admin/home_tabs.js";
import NonAdminHomeTabs from "@/components/user/non-admin/home_tabs.js";


export default function MainViewPage() {
  const cookies = useCookies();

  return (
    <main>
      <Header />
      <div id={styles.divMainVert}>
        {cookies.get("isAdmin") != 0 ? (
          <AdminHomeTabs/>
        ) : (
          <NonAdminHomeTabs/>
        )}
      </div>
    </main>
  );
}
