import React, { useState } from 'react'
import css from "./LogIn.module.css"
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInNavigate = () => {
    navigate("/signup");
  }

  const login = () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "İstifadəçi tapılmadı.") {
          setLoginMessage("Email düzgün deyil.");
        } else if (data.message === "Şifrə səhvdir.") {
          setLoginMessage("Şifrə düzgün deyil.");
        } else if (data.message === "Daxil olma uğurla tamamlandı!") {
          navigate("/adminpanel1");
        } else {
          setLoginMessage("Naməlum xəta baş verdi.");
        }
      })
      .catch((error) => {
        setLoginMessage(`Xəta baş verdi: ${error.message}`);
      });
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Admin panel</h2>
      <div className={css.inputs}>
        <div className={css.login}>
          <label>Login</label>
          <input name="email" value={loginData.email} onChange={handleLoginChange} type="text" />
        </div>
        <div className={css.password}>
          <label>Password</label>
          <input name="password" value={loginData.password} onChange={handleLoginChange} type="text" />
          <p className={css.warn}>If you don't have an account, sign up.</p>
        </div>
        <div className={css.buttons}>
          <button onClick={login} >Log in</button>
          <button onClick={handleSignInNavigate}>Sign up</button>
        </div>
        {loginMessage && <p className={css.message}>{loginMessage}</p>}
      </div>
    </div>
  )
}
