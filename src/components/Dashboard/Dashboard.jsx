import { useAuthContext } from '../../hooks/useAuthContext'
import { useProteinContext } from '../../hooks/useProteinContext'
// styles
import styles from './Dashboard.module.scss'

// components
import Profile from './Profile'
import Summary from './Summary'

export default function Dashboard() {

  const { user } = useAuthContext()

  const { proteinIntake } = useProteinContext()

  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Welcome, {user.displayName}!</h2>
        <Profile />
        <Summary proteinIntake={proteinIntake}/>
    </div>
  )
}
