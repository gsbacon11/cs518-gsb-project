import styles from "@/components/common/Common.module.css";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { apiAdminGetRequestedUsers, apiAdminApproveUsers } from "@/app/api";
import { Checkbox } from "@mui/material";

var reloadUsers = true;

export default function AdminView() {
  const cookies = useCookies();
  const [data, setData] = useState([]);
  const [noRequestedUsers, setNoRequestedUsers] = useState(true);

  const onLoad = async () => {
    const data1 = await apiAdminGetRequestedUsers(cookies.get("api_token"));
    if (data1.length == 0) {
      setNoRequestedUsers(true);
      return;
    }
    setNoRequestedUsers(false);
    setData(data1);
  };
  if (reloadUsers) {
    onLoad();
    reloadUsers = false;
  }
  function onCheckboxChnage(e, i) {
    data[i].isApproved = e.target.checked;
  }

  function onSubmit() {
    var approved_userIDs = [];
    var approved_emails = [];
    for (var i = 0; i < data.length; ++i) {
      if (data[i].isApproved == true) {
        approved_userIDs.push(data[i].userID);
        approved_emails.push(data[i].email);
      }
    }
    apiAdminApproveUsers(
      cookies.get("api_token"),
      approved_userIDs,
      approved_emails,
    );
    window.location.reload(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.mainForm}>
        <div className={styles.mainFormDiv}>
          <label className={styles.labelFormHeader}>Account Managment</label>
          <div className={styles.simpleDivision}></div>
          <div>
            {" "}
            {!noRequestedUsers ? (
              <table>
                <thead>
                  <tr>
                    <th className="px-10">
                      <label className="text-2xl">User Email</label>
                    </th>
                    <th className="px-20">
                      <label className="text-2xl">Approve</label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((val, i) => (
                    <tr key={i}>
                      <th>
                        <label>{val.email}</label>
                      </th>
                      <th>
                        <Checkbox onChange={(e) => onCheckboxChnage(e, i)} />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <label>No new user requests!</label>
            )}
          </div>

          <div className={styles.simpleDivision}></div>
          <button
            type="button"
            className={styles.mainPageButton}
            onClick={() => onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}

/*
{
                            data.map((val,i)=>
                            <tr>
                                <th>
                                    <label>{val.email}</label>
                                </th>
                                <th>
                                    <Checkbox/>
                                 </th>
                                <th>
                                    <Checkbox/>
                                </th>
                            </tr>
                            )
                             }
*/
