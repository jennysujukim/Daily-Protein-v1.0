import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLogin = () => {

    const [ error, setError ] = useState(null)
    const { dispatch } = useAuthContext()

    // create login function
        // - get two parameters: email, password
    const login = (email, password) => {

        setError(null)

        // built-in function of Firebase
            // - allow signing in user with matched email and password
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                // dispatch 'LOGIN' type and paylod action to AuthContext
                dispatch({ type: 'LOGIN', payload: response.user })
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return { error, login }
}