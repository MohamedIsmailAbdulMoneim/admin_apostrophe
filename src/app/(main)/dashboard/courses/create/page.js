'use client'

import { useFormState } from 'react-dom'

import classes from './create.module.css'
import ActionBtn from '@/components/action-btn/action-btn'
import { insertCourse } from '@/lib/courses/coursesLib'
import BasicAlerts from '@/components/alert/alert'

const CreateCourse =  () => {

    const [{message, severity}, formAction] = useFormState(insertCourse, { message: null })
    
    return (
    <>
    <div className={classes['container']}>
        <h2>Adding Course</h2>
        
        <form className={classes['form-container']} action={formAction} >
            <label htmlFor="coursename">
                Course Name:
            </label>
            <input className={classes['form__input']} id="coursename" type="text" name="coursename" required />
            <label htmlFor="courselink">
                Course Link:
            </label>
            <input className={classes['form__input']} id="courselink" type="text" name="courselink" required />
            <ActionBtn />
        </form>
            
    </div>
    {message && <BasicAlerts text={message} severity={severity} />}
    </>
  )
}

export default CreateCourse