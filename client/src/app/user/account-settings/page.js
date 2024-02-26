
//"use client";

import AccountSetting from "@/components/user/account_setting"
import Header from "@/components/common/header";

export default function AccountPage() {
  return (
    <main>
      <Header/>
      <div className={"flex items-start justify-between"}>
      <main className="w-full h-full">
      <AccountSetting/>
      </main>
    </div>
    </main>
  );
}