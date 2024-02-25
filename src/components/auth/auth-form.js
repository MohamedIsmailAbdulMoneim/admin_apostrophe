'use client'


import { useState } from 'react'
import { signIn } from "next-auth/react"
import {redirect} from "next/navigation"


import classes from './auth-form.module.css'

const AuthForm = () => {

  const [formInputsValue, setFormInputsValue] = useState({
    username: "",
    password: "",
  })

    const handleOnSubmit = async (e) => {
    e.preventDefault()
      const {username, password} = formInputsValue
      const res = await signIn('credentials', { redirect: false, username, password })
      if(res.ok)
      window.location.href = 'http://localhost:3000/dashboard'
    }

  return (
    <div className={classes['form__container']}>
      <h1 className={classes['form__heading']}>Admin panel login</h1>
      <div>
        <label className={classes['input__label']} htmlFor="username">Username</label>
        <input onChange={(e) => setFormInputsValue(old => ({
            ...old,
            [e.target.name]: e.target.value
          }))} className={classes['input__component']} type="text" name="username" id="username" />
      </div>
      <div>
        <label className={classes['input__label']} htmlFor="password">Password</label>
        <input
          onChange={(e) => setFormInputsValue(old => ({
            ...old,
            [e.target.name]: e.target.value
          }))}
          className={classes['input__component']}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button className={classes['action__btn']}onClick={handleOnSubmit}>Login</button>
    </div>
  )
}

export default AuthForm