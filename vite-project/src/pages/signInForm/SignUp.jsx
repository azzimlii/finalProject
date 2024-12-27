import React, { useState } from 'react'
import css from "./SignUp.module.css"
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [message, setMessage] = useState("");

  const signup = () => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setMessage("Qeydiyyat uğurla tamamlandı!");
      navigate("/login");
    })
    .catch((error) => {
      setMessage(error.message || "Xəta baş verdi.");
    })
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigate = () => {
    navigate("/login")
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Admin panel</h2>
      <div className={css.inputs}>
      <div className={css.name}>
        <label>Name</label>
    <input name = "name" value = {signupData.name} onChange={handleSignupChange} type="text"/>
    </div>
        <div className={css.email}>
        <label>Email</label>
    <input  name = "email" value = {signupData.email} onChange={handleSignupChange} type="text"/>
    </div>
    <div className={css.password}>
    <label>Password</label>
    <input name = "password" value = {signupData.password} onChange={handleSignupChange} type="text"/>
    <p className={css.warn}>If you have an account, log in.</p>
    </div>
    <div className={css.buttons}>
    <button onClick={handleNavigate}>Log in</button>
    <button onClick={signup} >Sign up</button>
    {message && <p>{message}</p>}
    </div>
      </div>
    </div>
  )
}
