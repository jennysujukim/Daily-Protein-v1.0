import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Dashboard.module.scss'

// components
import Profile from './Profile'
import Summary from './Summary'

export default function Dashboard() {

  const { user } = useAuthContext()

  return (
    <div>
        <h2 className={styles.title}>Welcome, {user.displayName}!</h2>
        <Profile />
        <Summary />
    </div>
  )
}
