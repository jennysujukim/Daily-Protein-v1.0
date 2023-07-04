import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import styles from './Login.module.scss'
import HandleLink from '../../components/HandleLink'

// components
import Error from '../../components/Error'

export default function Login() {

    // set State to retrieve user's input values
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    // handle retrieved input data with useLogin hook
        // - error: handle error
        // - login: save data to Firebase
    const { error, login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>DAILY<br />PROTEIN</div>
            <div className={styles.form_container}>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit}>
                    <label>
                        <span>Email</span>
                        <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                    </label>
                    { error && <Error message={error} />}
                    <button>Log In</button>
                </form>
                <div className={styles.signup}>
                    <p>OR</p>
                    <HandleLink dest={'/account/signup'}>
                        <button>Sign Up</button>
                    </HandleLink>
                </div>
            </div>
            
        </div>
    )
}
