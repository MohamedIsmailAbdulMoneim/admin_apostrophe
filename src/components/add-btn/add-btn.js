import Link from 'next/link'
import classes from './add-btn.module.css'

const AddBtn = ({path, text}) => {
  return (
    <Link href={`/${path}/create`} className={classes.btn}>{text}</Link>
  )
}

export default AddBtn