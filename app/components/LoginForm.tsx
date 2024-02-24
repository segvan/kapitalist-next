"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_REDIRECT_QS_NAME } from "@/libs/auth";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const responseData = await res.json();
    if (res.status === 200) {
      let redirectUrl = params.has(LOGIN_REDIRECT_QS_NAME)
        ? params.get(LOGIN_REDIRECT_QS_NAME) ?? "/"
        : "/";
      router.push(redirectUrl);
      router.refresh();
      return;
    } else {
      setPassword("");
      setError(responseData.message);
    }
  };

  return (
    <>
      {error && <div className="notification is-danger is-light">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="field">
          <div className="control">
            <input
              required
              className="input is-medium"
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              required
              className="input is-medium"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="button is-block is-success is-large is-fullwidth">
          Login
        </button>
      </form>
    </>
  );
}
