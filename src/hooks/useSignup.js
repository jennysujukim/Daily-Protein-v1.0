import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth } from '../firebase/config'
import { 
    createUserWithEmailAndPassword, 
    updateProfile } 
    from 'firebase/auth'

export const useSignup = () => {

    const [ error, setError ] = useState(null)
    const { dispatch } = useAuthContext()

    // create signup function
        // - get three parameters: email, password, displayName(username)
    const signup = (email, password, displayName) => {

        setError(null) 

        // built-in function of Firebase
            // - create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {

                // built-in function of Firebase
                    // - check the user to update displayName when creating User
                updateProfile(response.user, {
                    displayName: displayName
                }).then(() => {
                    // dispatch 'LOGIN' type and payload action to AuthContext
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