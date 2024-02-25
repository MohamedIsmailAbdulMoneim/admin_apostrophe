import Image from 'next/image'
import classes from './main-header.module.css'
import Logo from '@/assets/logo.png'

const MainHeader = () => {
  return (
    <header className={classes['header-container']}>
      <div className={classes.logo__container}>
        <Image width={50} height={50} className={classes['header__logo']} src={Logo} alt='logo' />
        <span className={classes['logo__name']}>postrophe</span>
      </div>
        <p className={classes['header__user']}>Admin</p>
    </header>
  )
}

export default MainHeader