import { useLogout } from '../../hooks/useLogout'

// styles
import styles from './_Footer.module.scss'

export default function Footer() {

    const { logout } = useLogout()

  return (
    <div className={styles.container}>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
