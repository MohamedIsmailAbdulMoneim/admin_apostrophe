'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

import classes from './action-btn.module.css'

const ActionBtn = () => {
    const { pending } = useFormStatus
  return (
        <div className={classes['form__submit-container']}>
            <input className={classes['form__submit']} disabled={pending} type='submit' value={`${pending ? 'Submiting...' : 'Submit'}`} />
        </div>
  )
}

export default ActionBtn