import Link  from 'next/link'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


import classes from './navigation-bar.module.css'

const NavigationBar = () => {

  return (
    <nav className={classes['navigation']}>
        <ul className={classes['navigation__list']}>
            <li className={classes['navigation__item']}>
                
                    <LocalLibraryIcon/>
                    <Link href="/dashboard/courses" className={classes['navigation__item-link']}>Courses</Link>
                
            </li>
            <li className={classes['navigation__item']}>
                <PeopleAltIcon/>
                <Link href="/dashboard/users" className={classes['navigation__item-link']}>Users</Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavigationBar