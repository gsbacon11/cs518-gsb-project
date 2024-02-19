
//"use client";

import AccountSettingSidebar from "@/components/user/account_setting_sidebar"

export default function AccountPage() {
  return (
    <main>
    <div className={"flex items-start justify-between"}>
      <AccountSettingSidebar/>
      <main className="w-full h-full">
      <button>lol</button>
      </main>
    </div>
    </main>
  );
}