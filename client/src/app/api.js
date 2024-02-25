export const apiLookupEmail =  async (email) => {

    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP + "/user/exists/" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
}

export const apiSignUp =  async (email, password) => {
  const formBody = JSON.stringify({
    email: email,
    password: password,
  });
  const res = await fetch("http://localhost:8080/signup/", {
    method: "POST",
    body: formBody,
    headers: {
      "Content-Type": "application/json",
    },
  });
    return await res.json();
}

export const apiPasswordReset =  async (email) => {
  const formBody = JSON.stringify({
      email: email
    });
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP +  "/password-reset/", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
}

export const apiRequestToken =  async (email, password) => {
    const formBody = JSON.stringify({
        email: email,
        password: password,
      });
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP +  "/login/", {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json();
}


export const apiLogin =  async (token) => {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_IP +  "/login/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token
        },
      });
      return await res.json();
}