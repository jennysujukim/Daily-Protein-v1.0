import { Link, useNavigate } from "react-router-dom"

// styles
import styles from './HandleLink.module.scss'

export default function HandleLink({ dest, children }) {

    const navigate = useNavigate()
    const handleLink = () => {
      navigate(dest)
    }

  return (
    <Link
      className={styles.a}
      to={dest}
      onClick={handleLink}>
        {children}
    </Link>
  )
}
