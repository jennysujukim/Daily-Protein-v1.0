import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import styles from './_Login.module.scss'
import HandleLink from '../../components/HandleLink'

export default function Login() {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { error, login } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
 
        console.log(email, password)
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
                    <button>Log In</button>
                    { error && <p>{error}</p> }
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
