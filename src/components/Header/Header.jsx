import { format } from 'date-fns'
import { useLogout } from '../../hooks/useLogout'

// styles
import styles from './Header.module.scss'

// components
import HandleLink from '../HandleLink'


export default function Header() {

    const date = format(new Date(), 'PP')

    const { logout } = useLogout()

  return (
    <div className={styles.container}>
      <HandleLink dest={'/'}>
        <div className={styles.logo}>DAILY PROTEIN</div>
      </HandleLink>
      <div>
        <div className={styles.date}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M352.817-310Q312-310 284-338.183q-28-28.183-28-69T284.183-476q28.183-28 69-28T422-475.817q28 28.183 28 69T421.817-338q-28.183 28-69 28ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"/>
          </svg>
          <div>{date}</div>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

    </div>
  )
}
