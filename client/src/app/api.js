export const apiLookupEmail = async (email) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/exists/" + email,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return await res.json();
};

export const apiSignUp = async (email, password) => {
  const formBody = JSON.stringify({
    email: email,
    password: password,
  });
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP + "/signup/", {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const apiPasswordReset = async (email) => {
  const formBody = JSON.stringify({
    email: email,
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/password-reset/",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return await res.json();
};

export const apiPasswordResetOnLogin = async (token, userId, pwd) => {
  const formBody = JSON.stringify({
    userID: userId,
    password: pwd,
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/password-reset/onlogin",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiRequestToken = async (email, password) => {
  const formBody = JSON.stringify({
    email: email,
    password: password,
  });
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP + "/login/", {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return [res.status, await res.json()];
};

export const apiLogin = async (token) => {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP + "/login/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return await res.json();
};

export const apiAuthLogin = async (token, userId, passcodeIn) => {
  const formBody = JSON.stringify({
    userID: userId,
    passcode: passcodeIn,
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/login/authenticate-login",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return [res.status, await res.json()];
};

export const apiAdminGetRequestedUsers = async (token) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/account-requests",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiAdminApproveUsers = async (token, userIds, emailsIn) => {
  const formBody = JSON.stringify({
    userIDs: userIds,
    emails: emailsIn,
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/approve-users",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return [res.status, await res.json()];
};

export const apiAdminGetCourses = async (token) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/courses",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiAdminUpdateCourses = async (token, courseNameIn, isPrereqIn) => {
  const formBody = JSON.stringify({
    courseName: courseNameIn,
    isPrereq: isPrereqIn
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/update-courses",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return [res.status, await res.json()];
};

export const apiAdminGetSheets = async (token) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/sheets",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiAdminGetSheetDetails = async (token, sheetID) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/sheet-details/" + sheetID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiAdminUpdateSheetStatus = async (token, sheetIDIn, statusIn, emailIn, notesIn) => {
  const formBody = JSON.stringify({
    sheetID: sheetIDIn,
    status: statusIn,
    email: emailIn,
    notes: notesIn
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/admin/update-status",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return [res.status, await res.json()];
};

export const apiGetTerms = async (token) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/terms",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiGetPrereqLevels = async (token) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/levels-prereq",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiGetCourseLevels = async (token) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/levels-courses",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};

export const apiSubmitSheet = async (token, userIDIn, termLastIn, termCurrentIn, gpaIn, preReqsIn, coursesIn) => {
  const formBody = JSON.stringify({
    userID: userIDIn,
    termLast: termLastIn,
    termCurrent: termCurrentIn,
    gpa: gpaIn,
    preReqs: preReqsIn,
    courses: coursesIn
  });
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/submit-sheet",
    {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return [res.status, await res.json()];
};

export const apiGetSheetsSatus = async (token, userID) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_IP + "/user/sheets-status/" + userID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    },
  );
  return await res.json();
};




