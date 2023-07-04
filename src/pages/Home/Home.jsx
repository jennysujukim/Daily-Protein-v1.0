// styles
import styles from './Home.module.scss'

// components
import Dashboard from '../../components/Dashboard'
import Tracker from '../../components/Tracker'

export default function Home() {
  return (
    <div className={styles.container}>
        <Dashboard />
        <Tracker />
    </div>
  )
}
