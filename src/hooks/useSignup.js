import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {

    const [ error, setError ] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = (email, password, displayName) => {

        setError(null) 

        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                console.log('User signed up:', response.user)

                updateProfile(response.user, {
                    displayName: displayName
                }).then(() => {
                    console.log('User display name updated:', displayName)
                    dispatch({ type: 'LOGIN', payload: response.user })
                }).catch((error) => {
                    console.error('Error updating displayName:', error)
                })
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return { error, signup }
}