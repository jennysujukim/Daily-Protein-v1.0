import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import styles from './Signup.module.scss'

// components
import HandleLink from '../../components/HandleLink'
import Error from '../../components/Error'

export default function Signup() {

    // set State to retrieve user's input values
    const [ displayName, setDisplayName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    // handle retrieved input data with useSignup hook
        // - error: handle error
        // - signup: save data to Firebase
    const { error, signup } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.logo}>DAILY<br />PROTEIN</div>
                <p>Start tracking your daily protein intake!</p>
            </div>
            <div className={styles.form_container}>
                <form 
                className={styles.form} 
                onSubmit={handleSubmit}>
                    <label>
                        <span>Username</span>
                        <input 
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}/>
                    </label>
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
                    { error && <Error message={error}/> }
                    <button>Sign Up</button>
                </form>
                <div className={styles.signin}>
                    <p>Already have an account?</p>
                    <HandleLink dest={'/account/login'}>
                    <button>Log In</button>
                    </HandleLink>
                </div>
            </div>
        </div>
    )
}
